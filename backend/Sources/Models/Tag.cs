using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

[Index(nameof(Name), IsUnique = true)]
internal class Tag
{
    public int Id { get; init; }

    /// <summary>
    /// This property is <see langword="init"/>-only because it doesn't make sense for <see cref="Post"/>s with a <see cref="Tag"/> to change its <see cref="Name"/>.
    /// </summary>
    [StringLength(32)]
    public required string Name { get; init; }
    public required ICollection<Post> Posts { get; set; }
}