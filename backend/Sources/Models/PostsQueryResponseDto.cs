using System.Collections.Generic;

namespace CitizenProposalApp;

/// <summary>
/// The DTO used as the response body of multiple-post queries.
/// </summary>
public record PostsQueryResponseDto
{
    /// <summary>
    /// The total number of posts there are. Used for pagination purposes.
    /// </summary>
    public required int Count { get; init; }

    /// <summary>
    /// The returned posts.
    /// </summary>
    public required IEnumerable<PostQueryResponseDto> Posts { get; init; }
}
