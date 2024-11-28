using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// Represents an enum-like entity that stores the type of a <see cref="Tag"/>. See <see cref="TagTypeId"/> for possible values.
/// </summary>
public class TagType
{
    /// <summary>
    /// The primary key.
    /// </summary>
    public TagTypeId Id { get; init; }

    /// <summary>
    /// The name of the tag type.
    /// </summary>
    [MaxLength(32)]
    public required string Name { get; init; }
}
