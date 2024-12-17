namespace CitizenProposalApp;

/// The DTO used to associate an attachment's ID and filename when querying posts.
/// </summary>
public record PostQueryAttachmentResponseDto
{
    /// <summary>
    /// The ID of the attachment.
    /// </summary>
    public required int Id { get; init; }

    /// <summary>
    /// The filename of the attachment.
    /// </summary>
    public required string Filename { get; init; }
}
