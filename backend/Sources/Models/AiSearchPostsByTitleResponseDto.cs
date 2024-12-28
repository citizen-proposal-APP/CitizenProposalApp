using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CitizenProposalApp;

internal sealed record AiSearchPostsByTitleResponseDto
{
    [JsonPropertyName("ranked_results")]
    public required IEnumerable<AiSearchPostsByTitleResultElementDto> RankedResults { get; init; }
}
