using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// Contains the title and content of a new <see cref="Post"/> to submit.
/// </summary>
public record PostSubmissionDto
{
    /// <summary>
    /// The title of the new <see cref="Post"/>.
    /// </summary>
    [MaxLength(100)]
    [BindRequired]
    public required string Title { get; init; }

    /// <summary>
    /// The content of the new <see cref="Post"/>.
    /// </summary>
    [MaxLength(2000)]
    [BindRequired]
    public required string Content { get; init; }

    /// <summary>
    /// The names of the <see cref="Tag"/>s to use.
    /// </summary>
    [ElementMaxLength(32)]
    public required ICollection<string> Tags { get; init; }
}
