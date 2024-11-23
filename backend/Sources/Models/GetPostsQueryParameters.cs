using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// Used for query parameter validation purposes with <see cref="PostsController.GetPostsByParameters(GetPostsQueryParameters)"/>.
/// </summary>
public record GetPostsQueryParameters
{
    /// <summary>
    /// The start index of the <see cref="Post"/> to get. The default value is 0.
    /// </summary>
    [Range(0, int.MaxValue)]
    public int Start { get; init; } = 0;

    /// <summary>
    /// How many <see cref="Post"/>s to get. The default value is 10.
    /// </summary>
    [Range(0, int.MaxValue)]
    public int Range { get; init; } = 10;

    /// <summary>
    /// How to order the queried <see cref="Post"/>s. The default value is ById.
    /// </summary>
    public PostSortKey SortBy { get; init; } = PostSortKey.ById;

    /// <summary>
    /// Whether to sort ascendingly or descendingly. The default value is Ascending.
    /// </summary>
    public SortDirection SortDirection { get; init; } = SortDirection.Ascending;
}
