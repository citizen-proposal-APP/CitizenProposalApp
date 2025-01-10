using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// Used as the query parameter for querying multiple tags.
/// </summary>
public record TagsQueryRequestDto
{
    /// <summary>
    /// The start index of the tags to get. The default value is 0.
    /// </summary>
    [Range(0, int.MaxValue)]
    public int Start { get; init; }

    /// <summary>
    /// How many tags to get. The default value is 10. The total number of returned tags may be less than this if there aren't enough tags to return.
    /// </summary>
    [Range(0, int.MaxValue)]
    public int Range { get; init; } = 10;

    /// <summary>
    /// The name of the tags to search. Tags that have this as their substrings in their names are included in the result. The search is case-insensitive. The max length is 32.
    /// </summary>
    [BindRequired]
    [MaxLength(32)]
    public required string Keyword { get; init; }
}
