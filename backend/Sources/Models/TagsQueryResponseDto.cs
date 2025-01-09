using System.Collections.Generic;

namespace CitizenProposalApp;

/// <summary>
/// The DTO used as the response body of multiple-tag queries.
/// </summary>
public record TagsQueryResponseDto
{
    /// <summary>
    /// The total number of tags there are. Used for pagination purposes.
    /// </summary>
    public required int Count { get; init; }

    /// <summary>
    /// The returned tags.
    /// </summary>
    public required IEnumerable<TagQueryResponseDto> Tags { get; init; }
}
