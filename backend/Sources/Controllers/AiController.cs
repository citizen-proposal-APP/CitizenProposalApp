using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using static Microsoft.AspNetCore.Http.StatusCodes;
using static System.Net.Mime.MediaTypeNames;

namespace CitizenProposalApp;

/// <summary>
/// Provides various services that use AI.
/// </summary>
/// <param name="aiService"></param>
[Route("/api/[controller]")]
public class AiController(IAiService aiService) : ControllerBase
{
    /// <summary>
    /// Guess what tags a post may have from its title.
    /// </summary>
    /// <param name="title">The title of the post to guess the tags of. Can be percent-encoded.</param>
    /// <returns>An <see cref="IEnumerable{T}"/> of possible tag names.</returns>
    /// <response code="200">An array of possible tags.</response>
    /// <response code="400">The title provided isn't valid.</response>
    /// <response code="503">The AI service failed to process the request.</response>
    [HttpGet("guesstags")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status503ServiceUnavailable, Application.ProblemJson)]
    public async Task<ActionResult<IEnumerable<string>>> GuessTags([FromQuery] string title)
    {
        IEnumerable<string>? tags = await aiService.GuessTags(title);
        if (tags is null)
        {
            return Problem("The AI service currently cannot process this request.", statusCode: Status503ServiceUnavailable);
        }
        return Ok(tags);
    }
}
