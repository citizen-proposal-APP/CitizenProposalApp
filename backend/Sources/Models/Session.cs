using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// Represents a session token that is used to authenticate a user.
/// </summary>
[Index(nameof(Token), IsUnique = true)]
public class Session
{
    /// <summary>
    /// The primary key.
    /// </summary>
    public int Id { get; init; }

    /// <summary>
    /// The <see cref="User"/> that <see cref="Token"/> authenticates.
    /// </summary>
    public required User User { get; set; }

    /// <summary>
    /// The session token.
    /// </summary>
    [MaxLength(64)]
    public required byte[] Token { get; set; }

    /// <summary>
    /// The date after which <see cref="Token"/> is no longer valid.
    /// </summary>
    public DateTime ExpirationTime { get; set; }
}