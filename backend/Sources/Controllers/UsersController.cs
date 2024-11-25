using AutoMapper;
using Konscious.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.AspNetCore.Http.StatusCodes;

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
    /// Registers a new <see cref="User"/>. If the registration is successful, also logs in the just-registered <see cref="User"/>.
    /// </summary>
    /// <param name="registerRequest">Contains the username and password to use.</param>
    /// <returns>Nothing if successful.</returns>
    /// <response code="201">The new user has been created successfully.</response>
    /// <response code="400">The request body is malformed or lacks required fields.</response>
    /// <response code="409">The specified username already exists.</response>
    [HttpPost("register")]
    [ProducesResponseType(Status201Created)]
    [ProducesResponseType(Status400BadRequest)]
    [ProducesResponseType(Status409Conflict)]
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
    /// <param name="loginrRequest">Contains the username and password to log in with.</param>
    /// <returns>Nothing if successful.</returns>
    /// <response code="204">Successfully logged in.</response>
    /// <response code="400">The request body is malformed or lacks required fields.</response>
    /// <response code="401">The username or password is incorrect.</response>
    [HttpPost("login")]
    [ProducesResponseType(Status204NoContent)]
    [ProducesResponseType(Status400BadRequest)]
    [ProducesResponseType(Status401Unauthorized)]
    public async Task<IActionResult> Login([FromForm] LoginrRequestDto loginrRequest)
    {
        User? user = await context.Users.FirstOrDefaultAsync(user => user.Username == loginrRequest.Username);
        if (user == null)
        {
            return Problem("The username or password is incorrect.", statusCode: Status401Unauthorized);
        }
        byte[] passwordHash = await HashPassword(loginrRequest.Password, user.Salt, hashingMemorySizeKib, hashingIterations, hashingDegreeOfParallelism);
        if (!passwordHash.SequenceEqual(user.PasswordHash))
        {
            return Problem("The username or password is incorrect.", statusCode: Status401Unauthorized);
        }
        using RandomNumberGenerator rng = RandomNumberGenerator.Create();
        await AddSession(user, rng);
        return NoContent();
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

    private async Task<User> AddUser(RegisterRequestDto registerRequest, RandomNumberGenerator rng)
    {
        byte[] salt = new byte[64];
        rng.GetBytes(salt);
        User newUser = new()
        {
            Username = registerRequest.Username,
            PasswordHash = await HashPassword(registerRequest.Password, salt, hashingMemorySizeKib, hashingIterations, hashingDegreeOfParallelism),
            Salt = salt,
            MemorySizeKib = 19 * 1024,
            IterationCount = 2,
            DegreeOfParallelism = 1,
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
        HttpContext.Response.Cookies.Append("session", Convert.ToBase64String(sessionToken), new() { Expires = expirationTime, Path = "/" });
        Session newSession = new()
        {
            User = user,
            Token = sessionToken,
            ExpirationTime = expirationTime
        };
        context.Sessions.Add(newSession);
        await context.SaveChangesAsync();
    }

    /// <summary>
    /// Gets the info of a <see cref="User"/> using its ID.
    /// </summary>
    /// <param name="id">The ID of the user to query.</param>
    /// <returns>A <see cref="UserQueryDto"/> containing info about the user.</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType(Status404NotFound)]
    public async Task<ActionResult<UserQueryDto>> GetUserById(int id)
    {
        User? user = await context.Users.FirstOrDefaultAsync(user => user.Id == id);
        if (user is null)
        {
            return Problem($"No user with ID \"{id}\" exists.", statusCode: Status404NotFound);
        }
        return mapper.Map<User, UserQueryDto>(user);
    }
}
