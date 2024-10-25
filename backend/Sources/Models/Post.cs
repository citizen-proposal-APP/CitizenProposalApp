using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

internal class Post
{
    public int Id { get; set; }

    [StringLength(100)]
    public required string Title { get; set; }

    [StringLength(2000)]
    public required string Content { get; set; }
    public required ICollection<Tag> Tags { get; set; }
    public required ICollection<Comment> Comments { get; set; }
}