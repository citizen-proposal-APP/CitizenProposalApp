using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace CitizenProposalApp;

internal class CitizenProposalAppDbContext(IConfiguration config) : DbContext
{
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Session> Sessions { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        if (builder.IsConfigured)
        {
            return;
        }
        builder.UseMySql(config.GetConnectionString("CitizenProposalApp"), new MySqlServerVersion(new Version(8, 0, 36)));
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Post>().HasData(DataSeeds.PostSeed);
        builder.Entity<Tag>().HasData(DataSeeds.TagSeed);
        builder.Entity<User>().HasData(DataSeeds.UserSeed);
        builder.Entity("PostTag").HasData(DataSeeds.PostTagSeed);
    }
}
