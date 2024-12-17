using System.Text.Json.Serialization;

namespace CitizenProposalApp;

internal sealed record AiSearchPostsByTitleResultElementDto
{
    [JsonPropertyName("index")]
    public required int PostId { get; init; }

    [JsonPropertyName("distance")]
    public required double Distance { get; init; }
}
