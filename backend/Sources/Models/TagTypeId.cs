namespace CitizenProposalApp;

/// <summary>
/// Used as the type of the primary key of <see cref="TagType"/>.
/// </summary>
public enum TagTypeId
{
    /// <summary>
    /// The <see langword="null"/>-like value that represents the state of not having a type.
    /// </summary>
    None,

    /// <summary>
    /// The <see cref="Tag"/> describes which government department a <see cref="Post"/> is addressing.
    /// </summary>
    Department,

    /// <summary>
    /// The <see cref="Tag"/> describes the topic that a <see cref="Post"/> is discussing about.
    /// </summary>
    Topic
}
