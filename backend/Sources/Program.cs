using System;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CitizenProposalApp;

internal sealed class Program
{
    private static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
        builder.Services
            .AddHsts(options =>
            {
                options.MaxAge = TimeSpan.FromDays(365);
                options.IncludeSubDomains = true;
            })
            .AddDbContext<CitizenProposalAppDbContext>()
            .AddProblemDetails()
            .AddAutoMapper(config => config.AddProfile<AutoMapperProfile>())
            .AddOpenApiDocument()
            .AddControllers()
            .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
        WebApplication app = builder.Build();
        if (app.Environment.IsProduction())
        {
            app.UseHsts();
        }
        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage()
                .AssertAutoMapperConfigurationIsValid();
        }
        app.UseStatusCodePages()
            .UseHttpsRedirection()
            .UseOpenApi()
            .UseSwaggerUi();
        app.MapControllers();
        app.MapGet("/api", () => "Welcome to the Citizen Proposal App API!");
        app.Run();
    }
}
