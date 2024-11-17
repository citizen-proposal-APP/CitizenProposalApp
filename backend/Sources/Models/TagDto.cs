namespace CitizenProposalApp;

public class TagDto
{
    public int Id { get; init; }

    /// <summary>
    /// This property is <see langword="init"/>-only because it doesn't make sense for <see cref="Post"/>s with a <see cref="Tag"/> to change its <see cref="Name"/>.
    /// </summary>
    public required string Name { get; init; }
}
