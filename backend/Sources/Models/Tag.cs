using System.ComponentModel.DataAnnotations;

namespace CitizenProposalApp;

internal class Tag
{
    public int Id { get; set; }

    [StringLength(32)]
    public required string Name { get; set; }
}