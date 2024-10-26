using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

internal class Tag
{
    public int Id { get; private set; }

    /// <summary>
    /// This property is <see langword="init"/>-only because it doesn't make sense for <see cref="Post"/>s with a <see cref="Tag"/> to change its <see cref="Name"/>.
    /// </summary>
    [StringLength(32)]
    public required string Name { get; init; }
}