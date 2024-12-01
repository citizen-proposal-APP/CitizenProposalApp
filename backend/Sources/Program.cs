using System;
using static System.Net.Mime.MediaTypeNames;
using System.Reflection;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            .AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new() { Title = "Citizen Proposal App", Version = "v1" });
                options.IncludeXmlComments(Assembly.GetExecutingAssembly());
                options.SupportNonNullableReferenceTypes();
            })
            .AddSingleton(TimeProvider.System)
            .AddControllers(options => options.Filters.Add(new ProducesAttribute(Application.Json)))
            .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
        builder.Services.AddAuthentication().AddScheme<SessionTokenAuthenticationHandlerOptions, SessionTokenAuthenticationHandler>("session", "Session token authentication handler", null);
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
            .UseSwagger()
            .UseSwaggerUI()
            .UseCookiePolicy(new()
            {
                HttpOnly = HttpOnlyPolicy.Always,
                Secure = CookieSecurePolicy.Always,
                MinimumSameSitePolicy = SameSiteMode.Strict
            });
        app.MapControllers();
        app.MapGet("/api", () => "Welcome to the Citizen Proposal App API!");
        app.Run();
    }
}
