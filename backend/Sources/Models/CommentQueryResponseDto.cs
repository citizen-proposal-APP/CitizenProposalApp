using System;

namespace CitizenProposalApp;

/// <summary>
/// The DTO used as the response body of single-comment queries.
/// </summary>
public record CommentQueryResponseDto
{
    /// <inheritdoc cref="Comment.Id"/>
    public required int Id { get; init; }

    /// <summary>
    /// The ID of the post under which this comment belongs.
    /// </summary>
    public required int ParentPostId { get; init; }

    /// <inheritdoc cref="Comment.Content"/>
    public required string Content { get; init; }

    /// <inheritdoc cref="Comment.PostedTime"/>
    public required DateTimeOffset PostedTime { get; init; }

    /// <summary>
    /// The user who made this comment.
    /// </summary>
    public required UserQueryResponseDto Author { get; init; }
}
