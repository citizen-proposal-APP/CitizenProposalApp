using AutoMapper;
using AutoMapper.QueryableExtensions;
using Konscious.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.AspNetCore.Http.StatusCodes;
using static System.Net.Mime.MediaTypeNames;
using static System.StringComparison;

namespace CitizenProposalApp;

/// <summary>
/// Registers users, logs in users, and queries a user's various data.
/// </summary>
/// <param name="context">The injected <see cref="CitizenProposalAppDbContext"/>.</param>
/// <param name="timeProvider">A <see cref="TimeProvider"/> that will be used to provide the current UTC time.</param>
/// <param name="mapper">The Automapper mapper.</param>
[Route("api/[controller]")]
public class UsersController(CitizenProposalAppDbContext context, TimeProvider timeProvider, IMapper mapper) : ControllerBase
{
    private const int hashingMemorySizeKib = 19 * 1024;
    private const int hashingIterations = 2;
    private const int hashingDegreeOfParallelism = 1;

    /// <summary>
    /// Registers a new user. If the registration is successful, also logs in the just-registered user.
    /// </summary>
    /// <param name="registerRequest">Contains the username and password to use.</param>
    /// <returns>Nothing if successful.</returns>
    /// <response code="201">The new user has been created successfully.</response>
    /// <response code="400">The request body is malformed, lacks required fields, or has a username longer than 32 characters.</response>
    /// <response code="409">The specified username already exists.</response>
    [HttpPost("register")]
    [ProducesResponseType(Status201Created)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status409Conflict, Application.ProblemJson)]
    public async Task<IActionResult> RegisterUser([FromForm] RegisterRequestDto registerRequest)
    {
        if (await context.Users.AnyAsync(user => user.Username == registerRequest.Username))
        {
            return Problem($"Username \"{registerRequest.Username}\" already exists.", statusCode: Status409Conflict);
        }
        using RandomNumberGenerator rng = RandomNumberGenerator.Create();
        User newUser = await AddUser(registerRequest, rng);
        await AddSession(newUser, rng);
        return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, null);
    }

    /// <summary>
    /// Logs in using a username and a password.
    /// </summary>
    /// <param name="loginRequest">Contains the username and password to log in with.</param>
    /// <returns>Nothing if successful.</returns>
    /// <response code="204">Successfully logged in.</response>
    /// <response code="400">The request body is malformed, lacks required fields, or has a username longer than 32 characters.</response>
    /// <response code="401">The username or password is incorrect.</response>
    [HttpPost("login")]
    [ProducesResponseType(Status204NoContent)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status401Unauthorized, Application.ProblemJson)]
    public async Task<IActionResult> Login([FromForm] LoginRequestDto loginRequest)
    {
        User? user = await context.Users.FirstOrDefaultAsync(user => user.Username == loginRequest.Username);
        if (user == null)
        {
            return Problem("The username or password is incorrect.", statusCode: Status401Unauthorized);
        }
        byte[] passwordHash = await HashPassword(loginRequest.Password, user.Salt, user.MemorySizeKib, user.IterationCount, user.DegreeOfParallelism);
        if (!passwordHash.SequenceEqual(user.PasswordHash))
        {
            return Problem("The username or password is incorrect.", statusCode: Status401Unauthorized);
        }
        using RandomNumberGenerator rng = RandomNumberGenerator.Create();
        await AddSession(user, rng);
        return NoContent();
    }

    /// <summary>
    /// Deletes the session cookie if it exists.
    /// </summary>
    /// <returns>Nothing if successful.</returns>
    /// <response code="204">The session cookie has been deleted if it existed.</response>
    [HttpDelete("logout")]
    [ProducesResponseType(Status204NoContent)]
    public async Task<NoContentResult> Logout()
    {
        string? sessionTokenString = HttpContext.Request.Cookies["session"];
        if (sessionTokenString is null)
        {
            return NoContent();
        }
        byte[] originalToken = Convert.FromBase64String(sessionTokenString);
        Session? sessionToRemove = context.Sessions.Where(session => session.Token.SequenceEqual(originalToken)).FirstOrDefault();
        if (sessionToRemove is not null)
        {
            context.Sessions.Remove(sessionToRemove);
            await context.SaveChangesAsync();
        }
        HttpContext.Response.Cookies.Append("session", "", new() { Expires = timeProvider.GetUtcNow().AddDays(-1) });
        return NoContent();
    }

    /// <summary>
    /// Gets the info of a user using its ID.
    /// </summary>
    /// <param name="id">The ID of the user to query.</param>
    /// <returns>A <see cref="UserQueryResponseDto"/> containing info about the user.</returns>
    /// <response code="200">An user with the specified ID.</response>
    /// <response code="400">The provided ID is not a valid integer.</response>
    /// <response code="404">No user with the specified ID exists.</response>
    [HttpGet("{id}")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    [ProducesResponseType<ProblemDetails>(Status404NotFound, Application.ProblemJson)]
    public async Task<ActionResult<UserQueryResponseDto>> GetUserById(int id)
    {
        User? user = await context.Users.FirstOrDefaultAsync(user => user.Id == id);
        if (user is null)
        {
            return Problem($"No user with ID \"{id}\" exists.", statusCode: Status404NotFound);
        }
        return mapper.Map<User, UserQueryResponseDto>(user);
    }

    /// <summary>
    /// Searches users with a keyword. The result is always sorted ascendingly by the lengths of the usernames.
    /// </summary>
    /// <param name="parameters">The query parameters to use.</param>
    /// <returns>The users that contain the given keyword.</returns>
    /// <response code="200">An object that contains the total number of users in the database that contain the given keyword in their usernames and an array of those users. The array can be empty if no usernames contains the given keyword.</response>
    [HttpGet]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType<ProblemDetails>(Status400BadRequest, Application.ProblemJson)]
    public async Task<ActionResult<UsersQueryResponseDto>> GetUsersByParameters([FromQuery] UsersQueryRequestDto parameters)
    {
        IQueryable<User> usersResult = context.Users
            .Where(user => user.Username.Contains(parameters.Keyword, InvariantCultureIgnoreCase))
            .OrderBy(user => user.Username.Length)
            .Skip(parameters.Start)
            .Take(parameters.Range);
        UsersQueryResponseDto result = new()
        {
            Count = await usersResult.CountAsync(),
            Users = usersResult.ProjectTo<UserQueryResponseDto>(mapper.ConfigurationProvider)
        };
        return result;
    }

    private static async Task<byte[]> HashPassword(string password, byte[] salt, int memorySize, int iterations, int degreeOfParallelism)
    {
        using Argon2id argon2Id = new(Encoding.UTF8.GetBytes(password))
        {
            Salt = salt,
            MemorySize = memorySize,
            Iterations = iterations,
            DegreeOfParallelism = degreeOfParallelism
        };
        return await argon2Id.GetBytesAsync(64);
    }

    /// <summary>
    /// Gets the info of the currently logged in user.
    /// </summary>
    /// <returns>A <see cref="UserQueryResponseDto"/> containing info about the user.</returns>
    /// <response code="200">The currently logged in user.</response>
    /// <response code="401">The user has not logged in or the session has expired.</response>
    [HttpGet("current")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType(typeof(void), Status401Unauthorized, Application.ProblemJson)]
    [Authorize]
    public async Task<ActionResult<UserQueryResponseDto>> GetCurrentUser()
    {
        User user = (await CitizenProposalApp.User.GetUserFromClaimsPrincipal(context.Users, User))!;
        return mapper.Map<User, UserQueryResponseDto>(user);
    }

    private async Task<User> AddUser(RegisterRequestDto registerRequest, RandomNumberGenerator rng)
    {
        byte[] salt = new byte[64];
        rng.GetBytes(salt);
        User newUser = new()
        {
            Username = registerRequest.Username,
            PasswordHash = await HashPassword(registerRequest.Password, salt, hashingMemorySizeKib, hashingIterations, hashingDegreeOfParallelism),
            Salt = salt,
            MemorySizeKib = hashingMemorySizeKib,
            IterationCount = hashingIterations,
            DegreeOfParallelism = hashingDegreeOfParallelism,
            Loginable = true,
            Posts = [],
            Sessions = [],
            Comments = []
        };
        context.Users.Add(newUser);
        await context.SaveChangesAsync();
        return newUser;
    }

    private async Task AddSession(User user, RandomNumberGenerator rng)
    {
        byte[] sessionToken = new byte[64];
        rng.GetBytes(sessionToken);
        DateTimeOffset expirationTime = timeProvider.GetUtcNow().AddDays(1);
        // The default constructor of CookieOptions already sets the path to /
        HttpContext.Response.Cookies.Append("session", Convert.ToBase64String(sessionToken), new() { Expires = expirationTime });
        Session newSession = new()
        {
            User = user,
            Token = sessionToken,
            ExpirationTime = expirationTime
        };
        context.Sessions.Add(newSession);
        await context.SaveChangesAsync();
    }
}
