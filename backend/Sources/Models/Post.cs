using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

public class Post
{
    public int Id { get; init; }

    [StringLength(100)]
    public required string Title { get; set; }

    [StringLength(2000)]
    public required string Content { get; set; }
    public DateTime PostedTime { get; set; }
    public required ICollection<Tag> Tags { get; init; }
    public required ICollection<Comment> Comments { get; init; }
    public required User Author { get; set; }
}