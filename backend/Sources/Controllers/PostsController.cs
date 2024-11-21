using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using static Microsoft.AspNetCore.Http.StatusCodes;

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
    public ActionResult<PostDto> GetPostById(int id)
    {
        Post? post = context.Posts
            .Include(post => post.Tags)
                .ThenInclude(tag => tag.TagType)
            .Include(post => post.Author)
            .FirstOrDefault(post => post.Id == id);
        if (post is null)
        {
            return Problem($"No post with the ID {id} exists.", statusCode: Status404NotFound);
        }
        return mapper.Map<Post, PostDto>(post);
    }
}