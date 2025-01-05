namespace CitizenProposalApp;

/// <summary>
/// The DTO used as the response body when the AI service checks if a piece of text or image is appropriate.
/// </summary>
public record AiSafetyQueryResponseDto
{
    /// <summary>
    /// <see langword="true"/> if the piece of text or image is appropriate.
    /// </summary>
    public required bool IsSafe { get; init; }
}
