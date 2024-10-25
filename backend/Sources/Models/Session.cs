using System;

namespace CitizenProposalApp;

internal class Session
{
    public int Id { get; set; }
    public required User User { get; set; }
    public required string Token { get; set; }
    public DateTime ExpirationTime { get; set; }
}