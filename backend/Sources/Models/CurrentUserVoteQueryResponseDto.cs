namespace CitizenProposalApp;

/// <summary>
/// Used as the response body when querying what kind of vote a user has cast on a post.
/// </summary>
public record CurrentUserVoteQueryResponseDto
{
    /// <summary>
    /// The kind of vote.
    /// </summary>
    public required VoteKind VoteKind { get; init; }
}
