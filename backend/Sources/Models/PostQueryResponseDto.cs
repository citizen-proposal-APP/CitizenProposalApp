using System.Collections.Generic;

namespace CitizenProposalApp;

/// <summary>
/// The DTO used as the response body of post queries.
/// </summary>
public record PostQueryResponseDto
{
    /// <summary>
    /// The total number of posts there are. Used for pagination purposes.
    /// </summary>
    public required int Count { get; init; }

    /// <summary>
    /// The returned posts.
    /// </summary>
    public required IEnumerable<PostQueryResponsePostDto> Posts { get; init; }
}
