using System.Text.Json.Serialization;

namespace CitizenProposalApp;

/// <summary>
/// The DTO used as the response body when <see cref="AiService"/> checks if a piece of text or image is inappropriate. This is only used internally to communicate with the AI service. The backend public API uses <see cref="AiSafetyQueryResponseDto"/> instead.
/// </summary>
internal sealed record AiModerationResponseDto
{
    /// <summary>
    /// <see langword="true"/> if the content is inappropriate.
    /// </summary>
    [JsonPropertyName("flag")]
    public required bool IsUnsafe { get; init; }
}
