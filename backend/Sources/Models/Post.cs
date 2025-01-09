using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
    /// The title of this post. The max length is 100.
    /// </summary>
    [MaxLength(100)]
    public required string Title { get; set; }

    /// <summary>
    /// The text of this post. The max length is 2000.
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
    public required ICollection<Tag> Tags { get; set; }

    /// <summary>
    /// The <see cref="Comment"/>s under this post.
    /// </summary>
    public required ICollection<Comment> Comments { get; set; }

    /// <summary>
    /// The <see cref="User"/> who made this post.
    /// </summary>
    [InverseProperty(nameof(User.Posts))]
    public required User Author { get; set; }

    /// <summary>
    /// The <see cref="Attachment"/>s on this post.
    /// </summary>
    public required ICollection<Attachment> Attachments { get; set; }

    /// <summary>
    /// The <see cref="User"/>s who liked this post.
    /// </summary>
    public required ICollection<User> LikedUsers { get; set; }

    /// <summary>
    /// The <see cref="User"/>s who disliked this post.
    /// </summary>
    public required ICollection<User> DislikedUsers { get; set; }
}
