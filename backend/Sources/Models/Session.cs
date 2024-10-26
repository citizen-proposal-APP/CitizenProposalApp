using System;
using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

internal class Session
{
    public int Id { get; private set; }
    public required User User { get; set; }

    [MaxLength(64)]
    public required byte[] Token { get; set; }
    public DateTime ExpirationTime { get; set; }
}