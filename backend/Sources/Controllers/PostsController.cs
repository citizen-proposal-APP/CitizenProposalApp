using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.AspNetCore.Http.StatusCodes;
using static CitizenProposalApp.SortDirection;
using static CitizenProposalApp.PostSortKey;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Globalization;

namespace CitizenProposalApp;

/// <summary>
/// Queries, adds, and edits posts.
/// </summary>
/// <param name="context">The injected <see cref="CitizenProposalAppDbContext"/>.</param>
/// <param name="mapper">The AutoMapper mapper.</param>
/// <param name="timeProvider">A <see cref="TimeProvider"/> that will be used to provide the current UTC time.</param>
[Route("api/[controller]")]
public class PostsController(CitizenProposalAppDbContext context, IMapper mapper, TimeProvider timeProvider) : ControllerBase
{
    /// <summary>
    /// Quries a post by its ID.
    /// </summary>
    /// <param name="id">The ID of the post to query.</param>
    /// <returns>A <see cref="PostQueryResponsePostDto"/> instance that contains the content, tags, and author of the queried post.</returns>
    /// <response code="200">A post with the specified ID.</response>
    /// <response code="400">The provided ID is not a valid integer.</response>
    /// <response code="404">No post with the specified ID exists.</response>
    [HttpGet("{id}")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType(Status400BadRequest)]
    [ProducesResponseType(Status404NotFound)]
    public async Task<ActionResult<PostQueryResponsePostDto>> GetPostById(int id)
    {
        Post? post = await context.Posts
            .Include(post => post.Tags)
                .ThenInclude(tag => tag.TagType)
            .Include(post => post.Author)
            .FirstOrDefaultAsync(post => post.Id == id);
        if (post is null)
        {
            return Problem($"No post with the ID {id} exists.", statusCode: Status404NotFound);
        }
        return mapper.Map<Post, PostQueryResponsePostDto>(post);
    }

    /// <summary>
    /// Queries posts by various query parameters.
    /// </summary>
    /// <param name="parameters">Contains the conditions about which posts to query.</param>
    /// <returns>The posts that meet the conditions speficied by <paramref name="parameters"/>.</returns>
    /// <response code="200">An object that contains the total number of posts in the database and an array of posts that satisify the given parameters. The array can be empty if no post satisfy the given parameters.</response>
    /// <response code="400">The query parameters are malformed.</response>
    [HttpGet]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType(Status400BadRequest)]
    public async Task<ActionResult<PostQueryResponseDto>> GetPostsByParameters([FromQuery] PostQueryRequestDto parameters)
    {
        if (!Enum.IsDefined(parameters.SortDirection) || !Enum.IsDefined(parameters.SortBy))
        {
            return Problem("\"SortDirection\" or \"SortBy\" contain invalid values.", statusCode: Status400BadRequest);
        }
        IIncludableQueryable<Post, User> unsortedPosts = context.Posts
            .Include(post => post.Tags)
                .ThenInclude(tag => tag.TagType)
            .Include(post => post.Author);
        IOrderedQueryable<Post> sortedPosts = (parameters.SortDirection, parameters.SortBy) switch
        {
            (Ascending, ById) => unsortedPosts.OrderBy(post => post.Id),
            (Ascending, ByDate) => unsortedPosts.OrderBy(post => post.PostedTime).ThenBy(post => post.Id),
            (Descending, ById) => unsortedPosts.OrderByDescending(post => post.Id),
            (Descending, ByDate) => unsortedPosts.OrderByDescending(post => post.PostedTime).ThenByDescending(post => post.Id),
            _ => throw new NotImplementedException("Impossible situation")
        };
        PostQueryResponseDto result = new()
        {
            Count = await context.Posts.CountAsync(),
            Posts = mapper.Map<IEnumerable<Post>, IEnumerable<PostQueryResponsePostDto>>(await sortedPosts.Skip(parameters.Start).Take(parameters.Range).ToListAsync())
        };
        return Ok(result);
    }

    /// <summary>
    /// Submits a new post. Tags that were not known by the DB are automatically added to it as "topic" tags.
    /// </summary>
    /// <param name="post">The post to submit.</param>
    /// <returns>Nothing if successful.</returns>
    /// <response code="201">The new post has been successfully created.</response>
    /// <response code="400">The request body is malformed or lacks required fields.</response>
    /// <response code="401">The user has not logged in, the logged-in user's account has been deleted, or the session has expired.</response>
    /// <response code="500">Something went wrong with the authentication process.</response>
    [HttpPost]
    [ProducesResponseType(Status201Created)]
    [ProducesResponseType(Status400BadRequest)]
    [ProducesResponseType(Status401Unauthorized)]
    [ProducesResponseType(Status500InternalServerError)]
    [Authorize]
    public async Task<IActionResult> AddPost([FromForm] PostSubmissionDto post)
    {
        Claim? userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim is null)
        {
            return Problem("Something went wrong with the authentication process.", statusCode: Status500InternalServerError);
        }
        User? author = await context.Users.FindAsync(int.Parse(userIdClaim.Value, CultureInfo.InvariantCulture));
        // Handles the possible race condition where the account has been deleted after the authentication and before this line.
        if (author is null)
        {
            return Problem("The account of the currently logged in user has been deleted.", statusCode: Status401Unauthorized);
        }
        // This is a compatibility fix for a bug in Swagger UI where if you use OpenAPI 3, arrays sent as form fields are sent as comma-separated lists instead of one element per field.
        // https://github.com/swagger-api/swagger-ui/issues/10221
        IEnumerable<string> tagsString = post.Tags.SelectMany(tag => tag.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries));
        await AddMissingTagsToDb(tagsString);
        // Since AddMissingTagsToDb never adds duplicate tags to the DB, this part will also not have duplicate tags.
        ICollection<Tag> tags = await context.Tags.Where(tag => tagsString.Contains(tag.Name)).ToListAsync();
        Post newPost = new()
        {
            Author = author,
            Comments = [],
            Content = post.Content,
            PostedTime = timeProvider.GetUtcNow(),
            Tags = tags,
            Title = post.Title
        };
        context.Posts.Add(newPost);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPostById), new { id = newPost.Id }, null);
    }

    private async Task AddMissingTagsToDb(IEnumerable<string> tagsToAddToNewPost)
    {
        IEnumerable<string> existingTagNames = context.Tags.Where(tag => tagsToAddToNewPost.Contains(tag.Name)).Select(tag => tag.Name);
        // Except only returns unique elements, so we will never add duplicate tags.
        IEnumerable<string> missingTagNames = tagsToAddToNewPost.Except(existingTagNames);
        TagType topicTagType = new() { Id = TagTypeId.Topic, Name = "topic" };
        context.TagTypes.Attach(topicTagType);
        IEnumerable<Tag> newTags = missingTagNames.Select(missingTagName => new Tag { Name = missingTagName, Posts = [], TagType = topicTagType });
        await context.Tags.AddRangeAsync(newTags);
        await context.SaveChangesAsync();
    }
}
