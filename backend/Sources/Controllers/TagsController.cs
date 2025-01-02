using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.AspNetCore.Http.StatusCodes;
using static System.StringComparison;
using static System.Net.Mime.MediaTypeNames;

namespace CitizenProposalApp;

/// <summary>
/// Queries tags.
/// </summary>
/// <param name="context">The injected <see cref="CitizenProposalAppDbContext"/>.</param>
/// <param name="mapper">The AutoMapper mapper.</param>
[Route("/api/[controller]")]
public class TagsController(CitizenProposalAppDbContext context, IMapper mapper) : ControllerBase
{
    /// <summary>
    /// Quries a tag by its ID.
    /// </summary>
    /// <param name="id">The ID of the tag to query.</param>
    /// <returns>A <see cref="TagQueryResponseDto"/> instance that contains the ID, name, and tag type of the queried tag.</returns>
    /// <response code="200">A tag with the specified ID.</response>
    /// <response code="400">The provided ID is not a valid integer.</response>
    /// <response code="404">No tag with the specified ID exists.</response>
    [HttpGet("{id}")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status404NotFound, Application.ProblemJson)]
    public async Task<ActionResult<TagQueryResponseDto>> GetTagById(int id)
    {
        Tag? tagResult = await context.Tags
            .Include(tag => tag.TagType)
            .FirstOrDefaultAsync(tag => tag.Id == id);
        if (tagResult is null)
        {
            return Problem($"No tag with the ID {id} exists.", statusCode: Status404NotFound);
        }
        return mapper.Map<Tag, TagQueryResponseDto>(tagResult);
    }

    /// <summary>
    /// Searches tags with a keyword. The result is always sorted ascendingly by the lengths of the tag names.
    /// </summary>
    /// <param name="parameters">The query parameters to use.</param>
    /// <returns>The tags that contain the given keyword.</returns>
    /// <response code="200">An object that contains the total number of tags in the database that contain the given keyword and an array of those tags. The array can be empty if no tag contains the given keyword.</response>
    [HttpGet]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    public async Task<ActionResult<TagsQueryResponseDto>> GetTagsByParameters([FromQuery] TagsQueryRequestDto parameters)
    {
        IQueryable<Tag> tagsResult = context.Tags
            //.Include(tag => tag.TagType)
            .Where(tag => tag.Name.Contains(parameters.Keyword, InvariantCultureIgnoreCase))
            .OrderBy(tag => tag.Name.Length)
            .Skip(parameters.Start)
            .Take(parameters.Range);
        TagsQueryResponseDto result = new()
        {
            Count = await tagsResult.CountAsync(),
            Tags = tagsResult.ProjectTo<TagQueryResponseDto>(mapper.ConfigurationProvider)
        };
        return result;
    }
}
