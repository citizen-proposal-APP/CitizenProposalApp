using System;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

public class Comment
{
    public int Id { get; init; }
    public DateTime PostedTime { get; set; }
    public required Post ParentPost { get; set; }
    public required User Author { get; set; }

    [StringLength(200)]
    public required string Content { get; set; }
}