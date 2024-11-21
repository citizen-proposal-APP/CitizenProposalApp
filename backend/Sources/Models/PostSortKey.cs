namespace CitizenProposalApp;

/// <summary>
/// What key to sort <see cref="Post"/>s with when querying multiple <see cref="Post"/>s.
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
