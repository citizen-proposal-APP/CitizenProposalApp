using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

[Index(nameof(Username), IsUnique = true)]
internal class User
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
    public required ICollection<Post> Posts { get; set; }
    public required ICollection<Session> Sessions { get; set; }
    public required ICollection<Comment> Comments { get; set; }
}