using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// Used as the query parameter for querying multiple posts.
/// </summary>
public record PostsQueryRequestDto
{
    /// <summary>
    /// The start index of the post to get. The default value is 0.
    /// </summary>
    [Range(0, int.MaxValue)]
    public int Start { get; init; }

    /// <summary>
    /// How many posts to get. The default value is 10. The total number of returned posts may be less than this if there aren't enough posts to return.
    /// </summary>
    [Range(0, int.MaxValue)]
    public int Range { get; init; } = 10;

    /// <summary>
    /// How to order the queried posts. The default value is ByDate.
    /// </summary>
    public PostSortKey SortBy { get; init; } = PostSortKey.ByDate;

    /// <summary>
    /// Whether to sort ascendingly or descendingly. The default value is Descending.
    /// </summary>
    public SortDirection SortDirection { get; init; } = SortDirection.Descending;

    /// <summary>
    /// The username of the author of the posts to search. Usernames that have this as their substrings are included in the result. The search is case-insensitive. The max length is 32.
    /// </summary>
    [MaxLength(32)]
    public string? Author { get; init; }

    /// <summary>
    /// The name of the tag of the posts to search. Tag names that have this as their substrings are included in the result. The search is case-insensitive. The max length is 32.
    /// </summary>
    [MaxLength(32)]
    public string? Tag { get; init; }

    /// <summary>
    /// The title or the content of the posts to search. Posts that have this as their substrings in their titles or contents are included in the result. The search is case-insensitive. The max length is 500.
    /// </summary>
    [MaxLength(500)]
    public string? Keyword { get; init; }

    /// <summary>
    /// Controls whether the keyword search does a fuzzy search using AI. If enabled, the keyword will only search titles of posts, and SortBy and SortDirection are ignored. The fuzzy search will be performed after all other criteria have finished filtering posts. The default value is false.
    /// </summary>
    public bool IsAiEnabled { get; init; }
}
