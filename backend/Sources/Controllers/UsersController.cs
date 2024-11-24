using AutoMapper;
using Konscious.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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
    /// <summary>
    /// Registers a new <see cref="User"/>.
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
        byte[] salt = new byte[64];
        rng.GetBytes(salt);
        using Argon2id argon2Id = new(Encoding.UTF8.GetBytes(registerRequest.Password))
        {
            Salt = salt,
            MemorySize = 19 * 1024,
            Iterations = 2,
            DegreeOfParallelism = 1
        };
        byte[] passwordHash = await argon2Id.GetBytesAsync(64);
        User newUser = new()
        {
            Username = registerRequest.Username,
            PasswordHash = passwordHash,
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
        return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, null);
    }

    /// <summary>
    /// Gets the info of a <see cref="User"/> using its ID.
    /// </summary>
    /// <param name="id">The ID of the user to query.</param>
    /// <returns>A <see cref="UserDto"/> containing info about the user.</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType(Status404NotFound)]
    public async Task<ActionResult<UserDto>> GetUserById(int id)
    {
        User? user = await context.Users.FirstOrDefaultAsync(user => user.Id == id);
        if (user is null)
        {
            return Problem($"No user with ID \"{id}\" exists.", statusCode: Status404NotFound);
        }
        return mapper.Map<User, UserDto>(user);
    }
}
