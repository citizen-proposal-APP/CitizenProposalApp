using System;
using System.Collections.Generic;

namespace CitizenProposalApp;

/// <summary>
/// The DTO used as the response body of <see cref="Post"/> queries.
/// </summary>
public record PostQueryResponseDto
{
    /// <inheritdoc cref="Post.Id"/>
    public required int Id { get; init; }

    /// <inheritdoc cref="Post.Title"/>
    public required string Title { get; init; }

    /// <inheritdoc cref="Post.Content"/>
    public required string Content { get; init; }

    /// <inheritdoc cref="Post.PostedTime"/>
    public required DateTimeOffset PostedTime { get; init; }

    /// <summary>
    /// The tags on this post.
    /// </summary>
    public required IList<TagQueryResponseDto> Tags { get; init; }

    /// <summary>
    /// The user who made this post.
    /// </summary>
    public required UserQueryResponseDto Author { get; init; }
}
