using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CitizenProposalApp;

internal class Program
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
            .AddDbContext<CitizenProposalAppDbContext>(options =>
                options.UseMySql(builder.Configuration.GetConnectionString("CitizenProposalApp"), new MySqlServerVersion(new Version(8, 0, 36)))
            );
        WebApplication app = builder.Build();
        if (!app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage()
                .UseHsts();
        }
        app.UseHttpsRedirection();
        app.MapGet("/", () => "Hello World!");
        app.Run();
    }
}
