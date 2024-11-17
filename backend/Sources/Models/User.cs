using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

[Index(nameof(Username), IsUnique = true)]
public class User
{
    public int Id { get; init; }

    [StringLength(32)]
    public required string Username { get; set; }

    /// <summary>
    /// Degree of parallelism used by the Argon2id algorithm.
    /// </summary>
    public int DegreeOfParallelism { get; set; }

    /// <summary>
    /// Memory used by the Argon2id algorithm in kibibytes.
    /// </summary>
    public int MemorySizeKib { get; set; }

    /// <summary>
    /// Number of iterations used by the Argon2id algorithm.
    /// </summary>
    public int IterationCount { get; set; }

    /// <summary>
    /// Password salt used by the Argon2id algorithm.
    /// </summary>
    [MaxLength(64)]
    public required byte[] Salt { get; set; }

    /// <summary>
    /// Argon2id hash of the password.
    /// </summary>
    [MaxLength(64)]
    public required byte[] PasswordHash { get; set; }

    /// <summary>
    /// If this is <see langword="false"/>, then all password and hashing related properties are ignored and any login attempt immediately fails.
    /// </summary>
    public bool Loginable { get; set; }

    public required ICollection<Post> Posts { get; init; }
    public required ICollection<Session> Sessions { get; init; }
    public required ICollection<Comment> Comments { get; init; }
}