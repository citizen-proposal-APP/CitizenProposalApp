using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CitizenProposalApp;

internal sealed record AiGuessTagsResponseDto
{
    [JsonPropertyName("department_label")]
    public required IEnumerable<string> DepartmentTags { get; init; }

    [JsonPropertyName("topic_label")]
    public IEnumerable<string>? TopicTags { get; init; }
}
