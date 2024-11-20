using System;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// Represents a comment under a <see cref="Post"/>.
/// </summary>
public class Comment
{
    /// <summary>
    /// The primary key.
    /// </summary>
    public int Id { get; init; }

    /// <summary>
    /// The date when this comment was posted.
    /// </summary>
    public DateTime PostedTime { get; set; }

    /// <summary>
    /// The <see cref="Post"/> that this comment belongs to.
    /// </summary>
    public required Post ParentPost { get; set; }

    /// <summary>
    /// The <see cref="User"/> who made this comment.
    /// </summary>
    public required User Author { get; set; }

    /// <summary>
    /// The text of this comment.
    /// </summary>
    [StringLength(200)]
    public required string Content { get; set; }
}