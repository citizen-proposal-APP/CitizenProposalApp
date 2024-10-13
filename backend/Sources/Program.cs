using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

namespace CitizenProposalApp;

internal class Program
{
    private static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
        builder.Services.AddHsts(options =>
        {
            options.MaxAge = TimeSpan.FromDays(365);
            options.IncludeSubDomains = true;
        });
        WebApplication app = builder.Build();
        if (!app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage()
                .UseHsts();
        }
        app.MapGet("/", () => "Hello World!");
        app.Run();
    }
}
