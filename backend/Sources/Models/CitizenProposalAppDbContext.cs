using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace CitizenProposalApp;

public class CitizenProposalAppDbContext(IConfiguration config) : DbContext
{
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Session> Sessions { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (optionsBuilder.IsConfigured)
        {
            return;
        }
        optionsBuilder.UseMySql(config.GetConnectionString("CitizenProposalApp"), new MySqlServerVersion(new Version(8, 0, 36)));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>().HasData(DataSeeds.PostSeed);
        modelBuilder.Entity<Tag>().HasData(DataSeeds.TagSeed);
        modelBuilder.Entity<User>().HasData(DataSeeds.UserSeed);
        modelBuilder.Entity("PostTag").HasData(DataSeeds.PostTagSeed);
    }
}
