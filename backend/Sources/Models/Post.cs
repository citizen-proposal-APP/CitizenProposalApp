using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

internal class Post
{
    public int Id { get; init; }

    [StringLength(100)]
    public required string Title { get; set; }

    [StringLength(2000)]
    public required string Content { get; set; }
    public DateTime PostedTime { get; set; }
    public required ICollection<Tag> Tags { get; set; }
    public required ICollection<Comment> Comments { get; set; }
}