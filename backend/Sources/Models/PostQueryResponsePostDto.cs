using System;
using System.Collections.Generic;

namespace CitizenProposalApp;

/// <summary>
/// The DTO used inside the array of posts in PostQueryResponseDto.
/// </summary>
public record PostQueryResponsePostDto
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

    /// <summary>
    /// The IDs of the attachments on this post. To get the attachments themselves, query them at <code>/api/Attachments/{id}</code>.
    /// </summary>
    public required IList<int> AttachmentIds { get; init; }
}
