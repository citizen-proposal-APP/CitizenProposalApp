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

namespace CitizenProposalApp;

/// <summary>
/// Queries, adds, and edits posts.
/// </summary>
/// <param name="context">The injected <see cref="CitizenProposalAppDbContext"/>.</param>
/// <param name="mapper">The AutoMapper mapper.</param>
[Route("api/[controller]")]
public class PostsController(CitizenProposalAppDbContext context, IMapper mapper) : ControllerBase
{
    /// <summary>
    /// Quries a post by its ID.
    /// </summary>
    /// <param name="id">The ID of the post to query.</param>
    /// <returns>A <see cref="PostDto"/> instance that contains the content, tags, and author of the queried post.</returns>
    /// <response code="200">A post with the specified ID.</response>
    /// <response code="404">No post with the specified ID exists.</response>
    [HttpGet("{id}")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType(Status404NotFound)]
    public async Task<ActionResult<PostDto>> GetPostById(int id)
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
        return mapper.Map<Post, PostDto>(post);
    }

    /// <summary>
    /// Queries posts by various query parameters.
    /// </summary>
    /// <param name="parameters">Contains the conditions about which <see cref="Post"/>s to query.</param>
    /// <returns>The <see cref="Post"/>s that meet the conditions speficied by <paramref name="parameters"/>.</returns>
    /// <response code="200">An array of posts that satisify the given parameters. The array can be empty if no post satisfy the given parameters.</response>
    /// <response code="400">The query parameters are malformed.</response>
    [HttpGet]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType(Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<PostDto>>> GetPostsByParameters([FromQuery] GetPostsQueryParameters parameters)
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
        return Ok(mapper.Map<IEnumerable<Post>, IEnumerable<PostDto>>(await sortedPosts.Skip(parameters.Start).Take(parameters.Range).ToListAsync()));
    }
}
