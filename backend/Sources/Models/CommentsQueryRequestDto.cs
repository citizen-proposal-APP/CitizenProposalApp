using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// Used as the query parameter for querying multiple comments.
/// </summary>
public record CommentsQueryRequestDto
{
    /// <summary>
    /// The start index of the comment to get. The default value is 0.
    /// </summary>
    [Range(0, int.MaxValue)]
    public int Start { get; init; } = 0;

    /// <summary>
    /// How many comments to get. The default value is 10.
    /// </summary>
    [Range(0, int.MaxValue)]
    public int Range { get; init; } = 10;

    /// <summary>
    /// Whether to sort the comments by date ascendingly or descendingly. The default value is Descending.
    /// </summary>
    public SortDirection SortDirection { get; init; } = SortDirection.Descending;
}
