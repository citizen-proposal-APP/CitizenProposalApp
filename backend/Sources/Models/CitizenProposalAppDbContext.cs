using Microsoft.EntityFrameworkCore;

namespace CitizenProposalApp;

internal class CitizenProposalAppDbContext(DbContextOptions<CitizenProposalAppDbContext> options) : DbContext(options)
{
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Session> Sessions { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<User> Users { get; set; }
}
