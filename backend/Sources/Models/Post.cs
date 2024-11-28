using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// Represents a post in the app.
/// </summary>
public class Post
{
    /// <summary>
    /// The primary key.
    /// </summary>
    public int Id { get; init; }

    /// <summary>
    /// The title of this post.
    /// </summary>
    [MaxLength(100)]
    public required string Title { get; set; }

    /// <summary>
    /// The text of this post.
    /// </summary>
    [MaxLength(2000)]
    public required string Content { get; set; }

    /// <summary>
    /// The date when this post was posted.
    /// </summary>
    public DateTimeOffset PostedTime { get; set; }

    /// <summary>
    /// The <see cref="Tag"/>s on this post.
    /// </summary>
    public required ICollection<Tag> Tags { get; init; }

    /// <summary>
    /// The <see cref="Comment"/>s under this post.
    /// </summary>
    public required ICollection<Comment> Comments { get; init; }

    /// <summary>
    /// The <see cref="User"/> who made this post.
    /// </summary>
    public required User Author { get; set; }
}