using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace CitizenProposalApp;

#pragma warning disable CA1812
internal sealed class SessionTokenAuthenticationHandler(IOptionsMonitor<SessionTokenAuthenticationHandlerOptions> options, ILoggerFactory logger, UrlEncoder encoder, CitizenProposalAppDbContext dbContext, TimeProvider timeProvider) : AuthenticationHandler<SessionTokenAuthenticationHandlerOptions>(options, logger, encoder)
{
    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        string? cookieString = Request.Cookies["session"];
        if (cookieString is null)
        {
            return AuthenticateResult.Fail("No cookie named \"session\" was found.");
        }
        byte[] sessionToken = Convert.FromBase64String(cookieString);
        Session? session = await dbContext.Sessions.Where(session => session.Token.SequenceEqual(sessionToken)).FirstOrDefaultAsync();
        if (session is null)
        {
            return AuthenticateResult.Fail("The \"session\" cookie doesn't contain a valid session token.");
        }
        if (session.ExpirationTime < timeProvider.GetUtcNow())
        {
            return AuthenticateResult.Fail("The \"session\" cookie has expired.");
        }
        int userId = dbContext.Entry(session).Property<int>("UserId").CurrentValue;
        List<Claim> claims = [
            new(ClaimTypes.NameIdentifier, userId.ToString(CultureInfo.InvariantCulture), ClaimValueTypes.Integer32)
        ];
        ClaimsPrincipal principal = new(new ClaimsIdentity(claims, Scheme.Name));
        AuthenticationTicket ticket = new(principal, Scheme.Name);
        return AuthenticateResult.Success(ticket);
    }
}
