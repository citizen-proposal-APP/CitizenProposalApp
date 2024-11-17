using System;
using System.Collections.Generic;

namespace CitizenProposalApp;

public class PostDto
{
    public int Id { get; init; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public DateTime PostedTime { get; set; }
    public required IList<TagDto> Tags { get; init; }
    public required UserDto Author { get; set; }
}
