using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using static Microsoft.AspNetCore.Http.StatusCodes;
using static System.Net.Mime.MediaTypeNames;

namespace CitizenProposalApp;

/// <summary>
/// Queries attachments.
/// </summary>
/// <param name="context">The injected <see cref="CitizenProposalAppDbContext"/>.</param>
[Route("/api/[controller]")]
public class AttachmentsController(CitizenProposalAppDbContext context) : ControllerBase
{
    /// <summary>
    /// Queries an attachment by its ID.
    /// </summary>
    /// <param name="id">The ID of the attachment to query.</param>
    /// <returns>The attachment's content if found.</returns>
    /// <response code="200">An attachment with the specified ID.</response>
    /// <response code="206">Partial content returned.</response>
    /// <response code="400">The provided ID is not a valid integer.</response>
    /// <response code="404">No attachment with the specified ID exists.</response>
    /// <response code="416">Invalid ranges.</response>
    [HttpGet("{id}")]
    [ProducesResponseType<FileResult>(Status200OK, Application.Octet)]
    [ProducesResponseType<FileResult>(Status206PartialContent, Application.Octet)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status404NotFound, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status416RangeNotSatisfiable, Application.ProblemJson)]
    public async Task<IActionResult> GetAttachmentById(int id)
    {
        Attachment? attachment = await context.Attachments.FindAsync(id);
        if (attachment is null)
        {
            return Problem($"No attachment with the ID {id} exists.", statusCode: Status404NotFound);
        }
        return File(attachment.Content, Application.Octet, attachment.Filename, true);
    }
}
