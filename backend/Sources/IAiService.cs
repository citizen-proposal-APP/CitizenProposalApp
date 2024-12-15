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
}
