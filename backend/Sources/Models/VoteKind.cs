namespace CitizenProposalApp;

/// <summary>
/// Represents different types of "vote". Usually used when querying the votes on a post.
/// </summary>
public enum VoteKind
{
    /// <summary>
    /// Represents the state where a user didn't vote on a post. Usually used when querying what a user has cast on a post, and the result is that the user didn't cast a vote.
    /// </summary>
    None,

    /// <summary>
    /// The like vote.
    /// </summary>
    Like,

    /// <summary>
    /// The dislike vote.
    /// </summary>
    Dislike
}
