using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// The request body used for logging in.
/// </summary>
public record LoginrRequestDto
{
    /// <summary>
    /// The username to use.
    /// </summary>
    [MinLength(1)]
    [MaxLength(32)]
    [BindRequired]
    public required string Username { get; init; }

    /// <summary>
    /// The password to use.
    /// </summary>
    [MinLength(1)]
    [BindRequired]
    public required string Password { get; init; }
}
