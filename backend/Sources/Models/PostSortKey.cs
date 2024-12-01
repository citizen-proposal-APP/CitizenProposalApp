namespace CitizenProposalApp;

/// <summary>
/// What key to sort posts with when querying multiple posts.
/// </summary>
public enum PostSortKey
{
    /// <summary>
    /// Sorts by <see cref="Post.PostedTime"/>.
    /// </summary>
    ByDate,

    /// <summary>
    /// Sorts by <see cref="Post.Id"/>.
    /// </summary>
    ById
}
