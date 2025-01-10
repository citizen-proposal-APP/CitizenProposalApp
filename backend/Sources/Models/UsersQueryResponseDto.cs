using System.Collections.Generic;

namespace CitizenProposalApp;

/// <summary>
/// The DTO used as the response body of multiple-user queries.
/// </summary>
public record UsersQueryResponseDto
{
    /// <summary>
    /// The total number of users there are. Used for pagination purposes.
    /// </summary>
    public required int Count { get; init; }

    /// <summary>
    /// The returned users.
    /// </summary>
    public required IEnumerable<UserQueryResponseDto> Users { get; init; }
}
