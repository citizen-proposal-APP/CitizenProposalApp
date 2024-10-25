using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

internal class User
{
    public int Id { get; set; }

    [StringLength(32)]
    public required string Username { get; set; }
}