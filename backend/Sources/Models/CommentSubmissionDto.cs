using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// Represents a new comment to submit.
/// </summary>
public record CommentSubmissionDto
{
    /// <summary>
    /// The content of the comment. The max length is 200.
    /// </summary>
    [MaxLength(200)]
    public required string Content { get; init; }
}
