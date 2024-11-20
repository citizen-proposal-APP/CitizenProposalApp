using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace CitizenProposalApp;

/// <summary>
/// A <see cref="DbContext"/> used by the Citizen Proposal App.
/// </summary>
/// <param name="config">The injected <see cref="IConfiguration"/> used to acquire the connection string from.</param>
public class CitizenProposalAppDbContext(IConfiguration config) : DbContext
{
    /// <summary>
    /// Represents a table that stores all the comments of all the posts in the app.
    /// </summary>
    public DbSet<Comment> Comments { get; set; }

    /// <summary>
    /// Represents a table that stores all the posts in the app.
    /// </summary>
    public DbSet<Post> Posts { get; set; }

    /// <summary>
    /// Represents a table that stores all the session tokens used to authenticate users.
    /// </summary>
    public DbSet<Session> Sessions { get; set; }

    /// <summary>
    /// Represents a table that stores all the tags that can be added to posts.
    /// </summary>
    public DbSet<Tag> Tags { get; set; }

    /// <summary>
    /// Represents a table that stores all user account related information.
    /// </summary>
    public DbSet<User> Users { get; set; }

    /// <summary>
    /// Used to configure EF Core to use MySQL with a connection string.
    /// </summary>
    /// <param name="optionsBuilder">The <see cref="DbContextOptionsBuilder"/> to configure.</param>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (optionsBuilder.IsConfigured)
        {
            return;
        }
        optionsBuilder.UseMySql(config.GetConnectionString("CitizenProposalApp"), new MySqlServerVersion(new Version(8, 0, 36)));
    }

    /// <summary>
    /// Adds data seeds to some entities.
    /// </summary>
    /// <param name="modelBuilder">The <see cref="ModelBuilder"/> to configure.</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>().HasData(DataSeeds.PostSeed);
        modelBuilder.Entity<Tag>().HasData(DataSeeds.TagSeed);
        modelBuilder.Entity<User>().HasData(DataSeeds.UserSeed);
        modelBuilder.Entity("PostTag").HasData(DataSeeds.PostTagSeed);
    }
}
