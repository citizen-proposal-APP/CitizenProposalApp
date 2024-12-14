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
using System.Globalization;

namespace CitizenProposalApp;

internal sealed class Program
{
    private static void Main(string[] args)
    {
        CultureInfo.DefaultThreadCurrentCulture = CultureInfo.InvariantCulture;
        CultureInfo.DefaultThreadCurrentUICulture = CultureInfo.InvariantCulture;
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
            .AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.SetIsOriginAllowed(origin =>
                    {
                        Uri originUri = new(origin);
                        return originUri.IsLoopback ||
                            originUri.Host is "nation-voice.works" ||
                            originUri.Host.EndsWith(".nation-voice.works", StringComparison.InvariantCulture);
                    })
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithExposedHeaders("*")
                    .AllowCredentials();
                });
            })
            .AddControllers(options => options.Filters.Add(new ProducesAttribute(Application.Json)))
            .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
        builder.Services.AddAuthentication().AddScheme<SessionTokenAuthenticationHandlerOptions, SessionTokenAuthenticationHandler>("session", "Session token authentication handler", null);
        WebApplication app = builder.Build(); // It seems like AddAuthorization is automagically called here. Can't find any documentation.
        // UseExceptionHandler is registered before UseDeveloperExceptionPage, so this is only used if the environment is Production to give a ProblemDetails response. At Production, UseDeveloperExceptionPage is used instead to return JSON or HTML.
        app.UseExceptionHandler();
        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage()
                .AssertAutoMapperConfigurationIsValid();
        }
        app.UseStatusCodePages()
            .UseSwagger()
            .UseSwaggerUI()
            .UseCookiePolicy(new()
            {
                HttpOnly = HttpOnlyPolicy.Always,
                Secure = CookieSecurePolicy.Always,
                MinimumSameSitePolicy = SameSiteMode.Strict
            })
            .UseCors()
            .UseAuthentication()
            .UseAuthorization();
        app.MapControllers();
        app.MapGet("/api", () => "Welcome to the Citizen Proposal App API!");
        app.Run();
    }
}
