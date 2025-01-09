using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

/// <summary>
/// The request body used for registering a new <see cref="User"/>.
/// </summary>
public record RegisterRequestDto
{
    /// <summary>
    /// The username to use. The max length is 32.
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
