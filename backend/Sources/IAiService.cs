using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace CitizenProposalApp;

/// <summary>
/// Represents services that this backend app that involves AI. The service is usually provided externally and the implementation of this interface usually uses a <see cref="HttpClient"/> to consume said service.
/// </summary>
public interface IAiService
{
    /// <summary>
    /// Guesses the tag names that a user will probably want to have on their <see cref="Post"/> having a <see cref="Post.Title"/> of <paramref name="title"/> using AI.
    /// </summary>
    /// <param name="title">The title of a <see cref="Post"/>.</param>
    /// <returns>An <see cref="IEnumerable{T}"/> of tag names that the user will probably want to have on their post. <see langword="null"/> is the AI service is unavailable.</returns>
    public Task<IEnumerable<string>?> GuessTags(string title);

    /// <summary>
    /// Adds the <see cref="Post.Id"/> and <see cref="Post.Title"/> to a database managed by the AI service so that the AI can search it later.
    /// </summary>
    /// <param name="id">The ID of the <see cref="Post"/> to add to the AI DB. The ID used here will be stored in a separate DB managed by the AI service, and should match the ID in the normal backend DB so that the IDs returned when searching <see cref="Post"/>s with AI can be interpreted correctly by the backend.</param>
    /// <param name="title">The title of the <see cref="Post"/> to add to the AI DB. This will be used as the search key when searching <see cref="Post"/>s with AI.</param>
    /// <returns>Whether the AI DB has successfully added the <see cref="Post"/>.</returns>
    public Task<bool> AddPostToAiDb(int id, string title);
}
