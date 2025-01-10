using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
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
    /// <response code="400">The title isn't provided.</response>
    /// <response code="503">The AI service failed to process the request.</response>
    [HttpGet("guesstags")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status503ServiceUnavailable, Application.ProblemJson)]
    public async Task<ActionResult<IEnumerable<string>>> GuessTags([FromQuery][Required] string title)
    {
        IEnumerable<string>? tags = await aiService.GuessTags(title);
        if (tags is null)
        {
            return Problem("The AI service currently cannot process this request.", statusCode: Status503ServiceUnavailable);
        }
        return Ok(tags);
    }

    /// <summary>
    /// Checks if a piece of text contains inappropriate content using AI. If the AI service is unavailable, defaults to returning "safe".
    /// </summary>
    /// <param name="text">The text to check.</param>
    /// <returns>An <see cref="AiSafetyQueryResponseDto"/> that indicates whether the text is appropriate.</returns>
    /// <response code="200">An object that indicates whether the text is appropriate.</response>
    /// <response code="400">The text isn't provided.</response>
    [HttpGet("checktext")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    public async Task<ActionResult<AiSafetyQueryResponseDto>> CheckTextSafety([FromQuery][Required] string text)
    {
        bool? isSafe = await aiService.CheckTextSafety(text);
        return new AiSafetyQueryResponseDto { IsSafe = isSafe ?? true };
    }

    /// <summary>
    /// Checks if an image contains inappropriate content using AI. If the AI service is unavailable, defaults to returning "safe".
    /// </summary>
    /// <param name="image">The image to check.</param>
    /// <returns>An <see cref="AiSafetyQueryResponseDto"/> that indicates whether the image is appropriate.</returns>
    /// <response code="200">An object that indicates whether the image is appropriate.</response>
    /// <response code="400">The image isn't provided, is larger than 1 MiB. or if the total size of the request body is over 1 MiB.</response>
    [HttpPost("checkimage")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [RequestFormLimits(MultipartBodyLengthLimit = imageCheckMultipartLimit)]
    [RequestSizeLimit(imageCheckMultipartLimit)]
    public async Task<ActionResult<AiSafetyQueryResponseDto>> CheckImageSafety([Required] IFormFile image)
    {
        using MemoryStream memoryStream = new((int)image.Length);
        await image.CopyToAsync(memoryStream);
        bool? isSafe = await aiService.CheckImageSafety(memoryStream.ToArray(), image.FileName);
        return new AiSafetyQueryResponseDto { IsSafe = isSafe ?? true };
    }

    private const long imageCheckMultipartLimit = 1 * 1024 * 1024;
}
