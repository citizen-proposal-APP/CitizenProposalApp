using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace CitizenProposalApp;

[Route("api/[controller]")]
public class PostsController(CitizenProposalAppDbContext context, IMapper mapper) : ControllerBase
{
    [HttpGet("{id}")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType(Status404NotFound)]
    public ActionResult<PostDto> GetPostById(int id)
    {
        Post? post = context.Posts
            .Include(post => post.Tags)
            .Include(post => post.Author)
            .FirstOrDefault(post => post.Id == id);
        if (post is null)
        {
            return Problem($"No post with ID {id} exists.", statusCode: Status404NotFound);
        }
        return mapper.Map<Post, PostDto>(post);
    }
}