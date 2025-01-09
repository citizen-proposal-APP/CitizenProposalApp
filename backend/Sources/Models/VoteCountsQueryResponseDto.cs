namespace CitizenProposalApp;

/// <summary>
/// Used as the response body when querying how many likes and dislikes a post has.
/// </summary>
public record VoteCountsQueryResponseDto
{
    /// <summary>
    /// How many likes the post has.
    /// </summary>
    public required int LikeCount { get; init; }

    /// <summary>
    /// How many dislikes the post has.
    /// </summary>
    public required int DislikeCount { get; init; }
}
