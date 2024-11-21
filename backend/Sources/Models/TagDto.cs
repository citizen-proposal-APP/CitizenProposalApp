namespace CitizenProposalApp;

/// <summary>
/// Represents a tag that can be used to tag a post.
/// </summary>
public class TagDto
{
    /// <inheritdoc cref="Tag.Id"/>
    public int Id { get; init; }

    /// <inheritdoc cref="Tag.Name"/>
    public required string Name { get; init; }

    /// <summary>
    /// The type of this tag. Possible values are "none", "department", and "topic".
    /// </summary>
    public required string TagType { get; init; }
}
