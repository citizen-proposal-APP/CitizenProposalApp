using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CitizenProposalApp;

/// <summary>
/// Represents a attachment that is posted along with a <see cref="Post"/>.
/// </summary>
public class Attachment
{
    /// <summary>
    /// The primary key.
    /// </summary>
    public int Id { get; init; }

    /// <summary>
    /// The content of the attachment.
    /// </summary>
    [Column(TypeName = "LONGBLOB")]
    public required byte[] Content { get; set; }

    /// <summary>
    /// The filename of the attachment. The max length is 256.
    /// </summary>
    [MaxLength(256)]
    public required string Filename { get; set; }

    /// <summary>
    /// The <see cref="Post"/> this attachment is attached to.
    /// </summary>
    public required Post ParentPost { get; set; }
}
