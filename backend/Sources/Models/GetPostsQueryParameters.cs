using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// Used for query parameter validation purposes with <see cref="PostsController.GetPostsByParameters(GetPostsQueryParameters)"/>.
/// </summary>
public record GetPostsQueryParameters
{
    /// <summary>
    /// The start index of the <see cref="Post"/> to get.
    /// </summary>
    [BindRequired]
    [Range(0, int.MaxValue)]
    public int Start { get; init; }

    /// <summary>
    /// How many <see cref="Post"/>s to get.
    /// </summary>
    [BindRequired]
    [Range(0, int.MaxValue)]
    public int Range { get; init; }

    /// <summary>
    /// How to order the queried <see cref="Post"/>s.
    /// </summary>
    public PostSortKey SortBy { get; init; }

    /// <inheritdoc cref="CitizenProposalApp.SortDirection"/>
    public SortDirection SortDirection { get; init; }
}
