namespace CitizenProposalApp;

/// <summary>
/// The DTO used as the response body of user queries.
/// </summary>
public class UserQueryResponseDto
{
    /// <inheritdoc cref="User.Id"/>
    public required int Id { get; init; }

    /// <inheritdoc cref="User.Username"/>
    public required string Username { get; init; }
}
