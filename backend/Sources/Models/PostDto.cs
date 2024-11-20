using System;
using System.Collections.Generic;

namespace CitizenProposalApp;

/// <inheritdoc cref="Post"/>
public class PostDto
{
    /// <inheritdoc cref="Post.Id"/>
    public int Id { get; init; }

    /// <inheritdoc cref="Post.Title"/>
    public required string Title { get; set; }

    /// <inheritdoc cref="Post.Content"/>
    public required string Content { get; set; }

    /// <inheritdoc cref="Post.PostedTime"/>
    public DateTime PostedTime { get; set; }

    /// <summary>
    /// The tags on this post.
    /// </summary>
    public required IList<TagDto> Tags { get; init; }

    /// <summary>
    /// The user who made this post.
    /// </summary>
    public required UserDto Author { get; set; }
}
