using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using static Microsoft.AspNetCore.Http.StatusCodes;
using static CitizenProposalApp.SortDirection;
using static CitizenProposalApp.PostSortKey;
using static System.StringComparison;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper.QueryableExtensions;
using System.Security.Claims;
using System.Globalization;

namespace CitizenProposalApp;

/// <summary>
/// Queries, adds, and edits posts.
/// </summary>
/// <param name="context">The injected <see cref="CitizenProposalAppDbContext"/>.</param>
/// <param name="mapper">The AutoMapper mapper.</param>
/// <param name="timeProvider">A <see cref="TimeProvider"/> that will be used to provide the current UTC time.</param>
/// <param name="logger">The injected <see cref="ILogger"/>.</param>
[Route("api/[controller]")]
public class PostsController(CitizenProposalAppDbContext context, IMapper mapper, TimeProvider timeProvider, ILogger<PostsController> logger) : ControllerBase
{
    /// <summary>
    /// Quries a post by its ID.
    /// </summary>
    /// <param name="id">The ID of the post to query.</param>
    /// <returns>A <see cref="PostQueryResponseDto"/> instance that contains the content, tags, and author of the queried post.</returns>
    /// <response code="200">A post with the specified ID.</response>
    /// <response code="400">The provided ID is not a valid integer.</response>
    /// <response code="404">No post with the specified ID exists.</response>
    [HttpGet("{id}")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status404NotFound, Application.ProblemJson)]
    public async Task<ActionResult<PostQueryResponseDto>> GetPostById(int id)
    {
        Post? post = await context.Posts
            .Include(post => post.Tags)
                .ThenInclude(tag => tag.TagType)
            .Include(post => post.Author)
            .Include(post => post.Attachments)
            .FirstOrDefaultAsync(post => post.Id == id);
        if (post is null)
        {
            return Problem($"No post with the ID {id} exists.", statusCode: Status404NotFound);
        }
        return mapper.Map<Post, PostQueryResponseDto>(post);
    }

    /// <summary>
    /// Queries posts by various query parameters. If multiple criteria are given, this searches for posts that satisfy all of them.
    /// </summary>
    /// <param name="parameters">Contains the conditions about which posts to query.</param>
    /// <param name="aiService">Injected <see cref="IAiService"/> from <see cref="HttpClientFactoryServiceCollectionExtensions.AddHttpClient{TClient, TImplementation}(IServiceCollection, Action{HttpClient})"/>.</param>
    /// <returns>The posts that meet the conditions speficied by <paramref name="parameters"/>.</returns>
    /// <response code="200">An object that contains the total number of posts in the database that satisfy the given parameters and an array of those posts. The array can be empty if no post satisfy the given parameters.</response>
    /// <response code="400">The query parameters are malformed.</response>
    /// <response code="503">The AI service failed to search the posts with the specified keyword.</response>
    [HttpGet]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status503ServiceUnavailable, Application.ProblemJson)]
    public async Task<ActionResult<PostsQueryResponseDto>> GetPostsByParameters([FromQuery] PostsQueryRequestDto parameters, [FromServices] IAiService aiService)
    {
        if (!Enum.IsDefined(parameters.SortDirection) || !Enum.IsDefined(parameters.SortBy))
        {
            return Problem("\"SortDirection\" or \"SortBy\" contain invalid values.", statusCode: Status400BadRequest);
        }
        // These Include calls are needed even though ProjectTo is used instead of Map, probably because HandlePostsQueryWithAi returns an IEnumerable wrapped as an IQueryable by calling AsQueryable.
        IQueryable<Post> posts = context.Posts
            .Include(post => post.Tags)
                .ThenInclude(tag => tag.TagType)
            .Include(post => post.Author)
            .Include(post => post.Attachments);
        if (parameters is { IsAiEnabled: true, Keyword: not null })
        {
            IEnumerable<int>? aiSearchResultPostIds = await aiService.SearchPostIdsByTitle(parameters.Keyword, parameters.Range);
            if (aiSearchResultPostIds is null)
            {
                return Problem($"The AI service failed to search the posts with the specified keyword (\"{parameters.Keyword}\").", statusCode: Status503ServiceUnavailable);
            }
            List<int> aiSearchResultPostIdsList = aiSearchResultPostIds.ToList();
            posts = HandlePostsQueryWithAi(posts, parameters, aiSearchResultPostIdsList);
        }
        // Includes the case where the keyword is null but AI is enabled, but it doesn't matter because it would just not filter by keyword at all
        else
        {
            posts = HandlePostsQueryWithoutAi(posts, parameters);
        }
        PostsQueryResponseDto result = new()
        {
            Count = posts.Count(), // Can't use CountAsync here because HandlePostsQueryWithAi returns a fake IQueryable for convenience, which throws when used with CountAsync.
            Posts = posts.ProjectTo<PostQueryResponseDto>(mapper.ConfigurationProvider)
        };
        return result;
    }

    /// <summary>
    /// Submits a new post. Tags that were not known by the DB are automatically added to it as "topic" tags.
    /// </summary>
    /// <param name="post">The post to submit.</param>
    /// <param name="aiService">Injected <see cref="IAiService"/> from <see cref="HttpClientFactoryServiceCollectionExtensions.AddHttpClient{TClient, TImplementation}(IServiceCollection, Action{HttpClient})"/>.</param>
    /// <returns>Nothing if successful.</returns>
    /// <response code="201">The new post has been successfully created.</response>
    /// <response code="400">The request body is malformed, lacks required fields, has form fields larger than 50 MiB, has a title longer than 100 characters, has a content longer than 2000 characters, has tag names longer than 32 characters, or the total size of the request body is over 100 MiB.</response>
    /// <response code="401">The user has not logged in or the session has expired.</response>
    [HttpPost]
    [ProducesResponseType(Status201Created)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType(typeof(void), Status401Unauthorized, Application.ProblemJson)]
    [RequestFormLimits(MultipartBodyLengthLimit = postSubmissionMultipartLimit)]
    [RequestSizeLimit(postSubmissionTotalLimit)]
    [Authorize]
    public async Task<IActionResult> AddPost([FromForm] PostSubmissionDto post, [FromServices] IAiService aiService)
    {
        User author = (await CitizenProposalApp.User.GetUserFromClaimsPrincipal(context.Users, User))!;
        IEnumerable<string> tagsString;
        ICollection<Tag> tags;
        if (post.Tags is null or { Count: 0 })
        {
            tagsString = [];
            tags = [];
        }
        else
        {
            // This is a compatibility fix for a bug in NSwag where if you use OpenAPI 3, arrays sent as form fields are sent as comma-separated lists instead of one element per field in the Swagger UI.
            // https://github.com/swagger-api/swagger-ui/issues/10221
            // This also conveniently trims all tags.
            tagsString = post.Tags.SelectMany(tag => tag.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries));
            await AddMissingTagsToDb(tagsString);
            // Since AddMissingTagsToDb never adds duplicate tags to the DB, this part will also not have duplicate tags.
            tags = await context.Tags.Where(tag => tagsString.Contains(tag.Name)).ToListAsync();
        }
        Post newPost = new()
        {
            Author = author,
            Comments = [],
            Content = post.Content,
            PostedTime = timeProvider.GetUtcNow(),
            Tags = tags,
            Title = post.Title,
            Attachments = [],
            LikedUsers = [],
            DislikedUsers = []
        };
        if (post.Attachments is not null and not { Count: 0 })
        {
            newPost.Attachments = await ProcessAttachments(post.Attachments, newPost);
        }
        context.Posts.Add(newPost);
        await context.SaveChangesAsync();
        if (!await aiService.AddPostToAiDb(newPost.Id, newPost.Title))
        {
            logger.LogFailureToAddPostToAiDb(newPost.Id, newPost.Title);
        }
        return CreatedAtAction(nameof(GetPostById), new { id = newPost.Id }, null);
    }

    /// <summary>
    /// Adds a comment to a post.
    /// </summary>
    /// <param name="comment">The comment to add.</param>
    /// <param name="postId">The ID of the post under which to post this comment.</param>
    /// <returns>Nothing if successful.</returns>
    /// <response code="201">The new comment has been successfully created.</response>
    /// <response code="400">The request is malformed or the comment is longer than 200 characters.</response>
    /// <response code="401">The user has not logged in or the session has expired.</response>
    /// <response code="404">No post with the specified ID exists.</response>
    [HttpPost("{postId}/Comments")]
    [ProducesResponseType(Status201Created)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType(typeof(void), Status401Unauthorized, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status404NotFound, Application.ProblemJson)]
    [Authorize]
    public async Task<IActionResult> AddComment([FromForm] CommentSubmissionDto comment, int postId)
    {
        Post? parentPost = await context.Posts.FindAsync(postId);
        if (parentPost is null)
        {
            return Problem($"No post with the ID {postId} exists.", statusCode: Status404NotFound);
        }
        User user = (await CitizenProposalApp.User.GetUserFromClaimsPrincipal(context.Users, User))!;
        Comment newComment = new()
        {
            Author = user,
            Content = comment.Content,
            ParentPost = parentPost,
            PostedTime = timeProvider.GetUtcNow()
        };
        context.Comments.Add(newComment);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPostById), new { id = postId }, null);
    }

    /// <summary>
    /// Queries comments under a post by various query parameters.
    /// </summary>
    /// <param name="parameters">Contains the conditions about which comments to query.</param>
    /// <param name="postId">The ID of the post under which to query comments.</param>
    /// <returns>The comments that meet the conditions speficied by <paramref name="parameters"/>.</returns>
    /// <response code="200">An object that contains the total number of comments in the database that satisfy the given parameters and an array of those comments. The array can be empty if no comment satisfy the given parameters.</response>
    /// <response code="400">The query parameters are malformed.</response>
    /// <response code="404">No post with the specified ID exists.</response>
    [HttpGet("{postId}/Comments")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status404NotFound, Application.ProblemJson)]
    public async Task<ActionResult<CommentsQueryResponseDto>> GetCommentsByParameters([FromQuery] CommentsQueryRequestDto parameters, int postId)
    {
        Post? parentPost = await context.Posts.FindAsync(postId);
        if (parentPost is null)
        {
            return Problem($"No post with the ID {postId} exists.", statusCode: Status404NotFound);
        }
        if (!Enum.IsDefined(parameters.SortDirection))
        {
            return Problem("\"SortDirection\" contain invalid values.", statusCode: Status400BadRequest);
        }
        IQueryable<Comment> comments = context.Comments.Where(comment => comment.ParentPost.Id == postId);
        comments = parameters.SortDirection switch
        {
            Ascending => comments.OrderBy(comment => comment.PostedTime),
            Descending => comments.OrderByDescending(comment => comment.PostedTime),
            _ => throw new NotImplementedException("Impossible situation")
        };
        comments = comments.Skip(parameters.Start).Take(parameters.Range);
        CommentsQueryResponseDto result = new()
        {
            Count = await comments.CountAsync(),
            Comments = comments.ProjectTo<CommentQueryResponseDto>(mapper.ConfigurationProvider)
        };
        return Ok(result);
    }

    /// <summary>
    /// Likes a post. If the post has already been liked, nothing will be done and 200 will be returned. If the post was originally disliked, the dislike will be removed and the post will be liked.
    /// </summary>
    /// <param name="postId">The ID of the post to like.</param>
    /// <returns>Nothing if successful.</returns>
    /// <response code="200">The post has been successfully liked or it has already been liked.</response>
    /// <response code="400">The provided ID is not a valid integer.</response>
    /// <response code="401">The user has not logged in or the session has expired.</response>
    /// <response code="404">No post with the specified ID exists.</response>
    [HttpPost("{postId}/like")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType(typeof(void), Status401Unauthorized, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status404NotFound, Application.ProblemJson)]
    [Authorize]
    public async Task<IActionResult> LikePost(int postId)
    {
        // If the user has already liked this post
        if (await context.Posts.AnyAsync(post => post.Id == postId && post.LikedUsers.Any(user => user.Id == GetUserId())))
        {
            return Ok();
        }
        Post? likingPost = await context.Posts
            .Include(post => post.LikedUsers)
            .Include(post => post.DislikedUsers)
            .FirstOrDefaultAsync(post => post.Id == postId);
        if (likingPost is null)
        {
            return Problem($"No post with the ID {postId} exists.", statusCode: Status404NotFound);
        }
        User currentUser = (await CitizenProposalApp.User.GetUserFromClaimsPrincipal(context.Users, User))!;
        likingPost.DislikedUsers.Remove(currentUser);
        likingPost.LikedUsers.Add(currentUser);
        await context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Dislikes a post. If the post has already been disliked, nothing will be done and 200 will be returned. If the post was originally liked, the like will be removed and the post will be disliked.
    /// </summary>
    /// <param name="postId">The ID of the post to dislike.</param>
    /// <returns>Nothing if successful.</returns>
    /// <response code="200">The post has been successfully disliked or it has already been disliked.</response>
    /// <response code="400">The provided ID is not a valid integer.</response>
    /// <response code="401">The user has not logged in or the session has expired.</response>
    /// <response code="404">No post with the specified ID exists.</response>
    [HttpPost("{postId}/dislike")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType(typeof(void), Status401Unauthorized, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status404NotFound, Application.ProblemJson)]
    [Authorize]
    public async Task<IActionResult> DislikePost(int postId)
    {
        // If the user has already disliked this post
        if (await context.Posts.AnyAsync(post => post.Id == postId && post.DislikedUsers.Any(user => user.Id == GetUserId())))
        {
            return Ok();
        }
        Post? dislikingPost = await context.Posts
            .Include(post => post.LikedUsers)
            .Include(post => post.DislikedUsers)
            .FirstOrDefaultAsync(post => post.Id == postId);
        if (dislikingPost is null)
        {
            return Problem($"No post with the ID {postId} exists.", statusCode: Status404NotFound);
        }
        User currentUser = (await CitizenProposalApp.User.GetUserFromClaimsPrincipal(context.Users, User))!;
        dislikingPost.DislikedUsers.Add(currentUser);
        dislikingPost.LikedUsers.Remove(currentUser);
        await context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Removes the like or dislike on a post. If the post hasn't been liked nor disliked, nothing will be done and 200 will be returned.
    /// </summary>
    /// <param name="postId">The ID of the post to remove a like or dislike from.</param>
    /// <returns>Nothing if successful.</returns>
    /// <response code="200">The like of dislike on the post has been successfully removed or it didn't have a like nor dislike.</response>
    /// <response code="400">The provided ID is not a valid integer.</response>
    /// <response code="401">The user has not logged in or the session has expired.</response>
    /// <response code="404">No post with the specified ID exists.</response>
    [HttpPost("{postId}/unvote")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType(typeof(void), Status401Unauthorized, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status404NotFound, Application.ProblemJson)]
    [Authorize]
    public async Task<IActionResult> Unvote(int postId)
    {
        Post? unvotingPost = await context.Posts
            .Include(post => post.LikedUsers)
            .Include(post => post.DislikedUsers)
            .FirstOrDefaultAsync(post => post.Id == postId);
        if (unvotingPost is null)
        {
            return Problem($"No post with the ID {postId} exists.", statusCode: Status404NotFound);
        }
        User currentUser = (await CitizenProposalApp.User.GetUserFromClaimsPrincipal(context.Users, User))!;
        unvotingPost.DislikedUsers.Remove(currentUser);
        unvotingPost.LikedUsers.Remove(currentUser);
        await context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Gets the number of likes and dislikes on a post.
    /// </summary>
    /// <param name="postId">The ID of the post to query.</param>
    /// <returns>A <see cref="VoteCountsQueryResponseDto"/> that contains the number of likes and dislikes on a <see cref="Post"/>.</returns>
    /// <response code="200">An object that contains the number of likes and dislikes on the speficie post.</response>
    /// <response code="400">The provided ID is not a valid integer.</response>
    /// <response code="404">No post with the specified ID exists.</response>
    [HttpGet("{postId}/votes")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status404NotFound, Application.ProblemJson)]
    public async Task<ActionResult<VoteCountsQueryResponseDto>> GetVoteCounts(int postId)
    {
        Post? post = await context.Posts
            .Include(post => post.LikedUsers)
            .Include(post => post.DislikedUsers)
            .FirstOrDefaultAsync(post => post.Id == postId);
        if (post is null)
        {
            return Problem($"No post with the ID {postId} exists.", statusCode: Status404NotFound);
        }
        VoteCountsQueryResponseDto result = new()
        {
            LikeCount = post.LikedUsers.Count,
            DislikeCount = post.DislikedUsers.Count
        };
        return result;
    }

    /// <summary>
    /// Gets what kind of vote the currently logged in user has cast on a post.
    /// </summary>
    /// <param name="postId">The ID of the post to query.</param>
    /// <returns>A <see cref="CurrentUserVoteQueryResponseDto"/> that contains the kind of vote the currently logged in user has cast on the specified post.</returns>
    /// <response code="200">An object that contains the kind vote the currently logged in user has cast on the specified post.</response>
    /// <response code="400">The provided ID is not a valid integer.</response>
    /// <response code="401">The user has not logged in or the session has expired.</response>
    /// <response code="404">No post with the specified ID exists.</response>
    [HttpGet("{postId}/votes/mine")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType(typeof(void), Status401Unauthorized, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status404NotFound, Application.ProblemJson)]
    [Authorize]
    public async Task<ActionResult<CurrentUserVoteQueryResponseDto>> GetCurrentUserVote(int postId)
    {
        Post? post = await context.Posts
            .Include(post => post.LikedUsers)
            .Include(post => post.DislikedUsers)
            .FirstOrDefaultAsync(post => post.Id == postId);
        if (post is null)
        {
            return Problem($"No post with the ID {postId} exists.", statusCode: Status404NotFound);
        }
        User currentUser = (await CitizenProposalApp.User.GetUserFromClaimsPrincipal(context.Users, User))!;
        if (post.LikedUsers.Any(user => user.Id == currentUser.Id))
        {
            return new CurrentUserVoteQueryResponseDto { VoteKind = VoteKind.Like };
        }
        if (post.DislikedUsers.Any(user => user.Id == currentUser.Id))
        {
            return new CurrentUserVoteQueryResponseDto { VoteKind = VoteKind.Dislike };
        }
        return new CurrentUserVoteQueryResponseDto { VoteKind = VoteKind.None };
    }

    private int GetUserId()
    {
        Claim? userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)
            ?? throw new InvalidOperationException($"{nameof(User)} doesn't contain a {nameof(Claim)} that has type {nameof(ClaimTypes.NameIdentifier)}.");
        return int.Parse(userIdClaim.Value, CultureInfo.InvariantCulture);
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

    private static async Task<ICollection<Attachment>> ProcessAttachments(IFormFileCollection attachments, Post parentPost)
    {
        Attachment[] result = await Task.WhenAll(
            attachments.Select(
                async attachment =>
                {
                    using MemoryStream memoryStream = new((int)attachment.Length);
                    await attachment.CopyToAsync(memoryStream);
                    string filename = new(Path.GetRandomFileName() + Path.GetExtension(attachment.FileName));
                    if (filename.Length > 256)
                    {
                        filename = filename[^256..];
                    }
                    return new Attachment
                    {
                        Content = memoryStream.ToArray(),
                        Filename = filename,
                        ParentPost = parentPost
                    };
                }
            )
        );
        return result;
    }

    private static IQueryable<Post> HandlePostsQueryCommonLogic(IQueryable<Post> posts, PostsQueryRequestDto parameters)
    {
        if (parameters.Author is not null)
        {
            posts = posts.Where(post => post.Author.Username.Contains(parameters.Author, InvariantCultureIgnoreCase));
        }
        if (parameters.Tag is not null)
        {
            posts = posts.Where(post => post.Tags.Any(tag => tag.Name.Contains(parameters.Tag, InvariantCultureIgnoreCase)));
        }
        return posts;
    }

    private static IQueryable<Post> HandlePostsQueryWithoutAi(IQueryable<Post> posts, PostsQueryRequestDto parameters)
    {
        posts = HandlePostsQueryCommonLogic(posts, parameters);
        if (parameters.Keyword is not null)
        {
            posts = posts.Where(post =>
                post.Title.Contains(parameters.Keyword, InvariantCultureIgnoreCase) ||
                post.Content.Contains(parameters.Keyword, InvariantCultureIgnoreCase));
        }
        IOrderedQueryable<Post> sortedPosts = (parameters.SortDirection, parameters.SortBy) switch
        {
            (Ascending, ById) => posts.OrderBy(post => post.Id),
            (Ascending, ByDate) => posts.OrderBy(post => post.PostedTime).ThenBy(post => post.Id),
            (Descending, ById) => posts.OrderByDescending(post => post.Id),
            (Descending, ByDate) => posts.OrderByDescending(post => post.PostedTime).ThenByDescending(post => post.Id),
            _ => throw new NotImplementedException("Impossible situation")
        };
        return sortedPosts.Skip(parameters.Start).Take(parameters.Range);
    }

    private static IQueryable<Post> HandlePostsQueryWithAi(IQueryable<Post> posts, PostsQueryRequestDto parameters, List<int> aiSearchResultPostIds)
    {
        posts = HandlePostsQueryCommonLogic(posts, parameters);
        if (parameters.Keyword is not null)
        {
            posts = posts.Where(post => aiSearchResultPostIds.Contains(post.Id));
            IEnumerable<Post> postsEnumerable = posts;
            // Sorts the AI result based on the order specified in aiSearchResultPostIds
            // This can't be translated to SQL, so do it as an IEnumerable
            postsEnumerable = postsEnumerable.OrderBy(post => aiSearchResultPostIds.IndexOf(post.Id));
            return postsEnumerable.AsQueryable();
        }
        // No need to Skip and Take here because aiSearchResultPostIds only contains parameters.Range elements, so posts already only has parameters.Range elements
        return posts;
    }

    private const long postSubmissionMultipartLimit = 50 * 1024 * 1024;
    private const long postSubmissionTotalLimit = 100 * 1024 * 1024;
}
