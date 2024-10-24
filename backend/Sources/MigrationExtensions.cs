using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CitizenProposalApp;

internal static class MigrationExtentions
{
    /// <summary>
    /// Migrates <typeparamref name="Context"/> on app startup.
    /// </summary>
    /// <typeparam name="Context">The <see cref="DbContext"/> to migrate.</typeparam>
    /// <param name="app">The <see cref="IApplicationBuilder"/> returned from <see cref="WebApplicationBuilder.Build"/>.</param>
    /// <returns><paramref name="app"/></returns>
    public static IApplicationBuilder EnsureMigration<Context>(this IApplicationBuilder app) where Context : DbContext
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();
        scope.ServiceProvider.GetRequiredService<Context>().Database.Migrate();
        return app;
    }
}
