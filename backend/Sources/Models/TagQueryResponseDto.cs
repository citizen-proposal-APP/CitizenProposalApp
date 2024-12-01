namespace CitizenProposalApp;

/// <summary>
/// The DTO used as the response body of <see cref="Tag"/> queries.
/// </summary>
public record TagQueryResponseDto
{
    /// <inheritdoc cref="Tag.Id"/>
    public required int Id { get; init; }

    /// <inheritdoc cref="Tag.Name"/>
    public required string Name { get; init; }

    /// <summary>
    /// The type of this tag. Possible values are "none", "department", and "topic".
    /// </summary>
    public required string TagType { get; init; }
}
