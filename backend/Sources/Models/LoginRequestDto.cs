using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// The request body used for logging in.
/// </summary>
public record LoginRequestDto
{
    /// <summary>
    /// The username to use.
    /// </summary>
    [MaxLength(32)]
    [BindRequired]
    public required string Username { get; init; }

    /// <summary>
    /// The password to use.
    /// </summary>
    [BindRequired]
    public required string Password { get; init; }
}
