using Microsoft.AspNetCore.Http;
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
    /// The title of the new post.
    /// </summary>
    [MaxLength(100)]
    [BindRequired]
    public required string Title { get; init; }

    /// <summary>
    /// The content of the new post.
    /// </summary>
    [MaxLength(2000)]
    [BindRequired]
    public required string Content { get; init; }

    /// <summary>
    /// The names of the tags to use.
    /// </summary>
    [ElementMaxLength(32)]
    public ICollection<string>? Tags { get; init; }

    /// <summary>
    /// The files to add as attachments.
    /// </summary>
    public IFormFileCollection? Attachments { get; init; }
}
