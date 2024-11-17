using System;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

public class Session
{
    public int Id { get; init; }
    public required User User { get; set; }

    [MaxLength(64)]
    public required byte[] Token { get; set; }
    public DateTime ExpirationTime { get; set; }
}