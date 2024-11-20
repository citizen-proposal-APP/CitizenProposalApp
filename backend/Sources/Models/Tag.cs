using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// Represents a tag that can be used to tag a <see cref="Post"/>.
/// </summary>
[Index(nameof(Name), IsUnique = true)]
public class Tag
{
    /// <summary>
    /// The primary key.
    /// </summary>
    public int Id { get; init; }

    /// <summary>
    /// The name of this tag.
    /// </summary>
    [StringLength(32)]
    public required string Name { get; init; }

    /// <summary>
    /// The <see cref="Post"/>s that uses this tag.
    /// </summary>
    public required ICollection<Post> Posts { get; init; }
}