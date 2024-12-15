using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CitizenProposalApp;

internal static class MigrationExtentions
{
    /// <summary>
    /// Migrates <typeparamref name="TContext"/> on app startup.
    /// </summary>
    /// <typeparam name="TContext">The <see cref="DbContext"/> to migrate.</typeparam>
    /// <param name="app">The <see cref="IApplicationBuilder"/> returned from <see cref="WebApplicationBuilder.Build"/>.</param>
    /// <returns><paramref name="app"/></returns>
    public static IApplicationBuilder EnsureMigration<TContext>(this IApplicationBuilder app) where TContext : DbContext
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();
        scope.ServiceProvider.GetRequiredService<TContext>().Database.Migrate();
        return app;
    }
}
