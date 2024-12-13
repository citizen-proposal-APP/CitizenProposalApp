using System.Collections.Generic;

namespace CitizenProposalApp;

/// <summary>
/// The DTO used as the response body of multiple-comment queries.
/// </summary>
public record CommentsQueryResponseDto
{
    /// <summary>
    /// The total number of comments there are. Used for pagination purposes.
    /// </summary>
    public required int Count { get; init; }

    /// <summary>
    /// The returned comments.
    /// </summary>
    public required IEnumerable<CommentQueryResponseDto> Comments { get; init; }
}
