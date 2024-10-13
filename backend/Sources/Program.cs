using Microsoft.AspNetCore.Builder;

namespace CitizenProposalApp;

internal class Program
{
    private static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
        WebApplication app = builder.Build();
        app.MapGet("/", () => "Hello World!");
        app.Run();
    }
}
