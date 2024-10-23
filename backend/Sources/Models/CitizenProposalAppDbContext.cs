using Microsoft.EntityFrameworkCore;

namespace CitizenProposalApp;

internal class CitizenProposalAppDbContext(DbContextOptions<CitizenProposalAppDbContext> options) : DbContext(options)
{
}
