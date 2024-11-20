namespace CitizenProposalApp;

/// <inheritdoc cref="User"/>
public class UserDto
{
    /// <inheritdoc cref="User.Id"/>
    public int Id { get; init; }

    /// <inheritdoc cref="User.Username"/>
    public required string Username { get; set; }
}
