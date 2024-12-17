using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace CitizenProposalApp;

internal static class AutoMapperExtensions
{
    public static IApplicationBuilder AssertAutoMapperConfigurationIsValid(this IApplicationBuilder app)
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();
        scope.ServiceProvider.GetRequiredService<IMapper>().ConfigurationProvider.AssertConfigurationIsValid();
        return app;
    }
}
