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

    /// <summary>
    /// Searches <see cref="Post.Title"/>s fuzzily using AI.
    /// </summary>
    /// <param name="title">The title to search.</param>
    /// <param name="postCount">Max number of <see cref="Post.Id"/>s to return. The return value may contain less IDs than <paramref name="postCount"/>.</param>
    /// <returns>A <see cref="IEnumerable{T}"/> of <see cref="Post.Id"/>s sorted from the most similiar to the least similiar to <paramref name="title"/>. <see langword="null"/> is the AI service is unavailable.</returns>
    public Task<IEnumerable<int>?> SearchPostIdsByTitle(string title, int postCount);

    /// <summary>
    /// Checks if a <see langword="string"/> contains inappropriate content using AI.
    /// </summary>
    /// <param name="text">The text to check.</param>
    /// <returns><see langword="false"/> if the text is inappropriate. <see langword="null"/> is the AI service is unavailable.</returns>
    public Task<bool?> CheckTextSafety(string text);

    /// <summary>
    /// Checks if an image contains inappropriate content using AI.
    /// </summary>
    /// <param name="image">The image to check.</param>
    /// <param name="filename">The filename of the <paramref name="image"/>. Usually used to extract the Content-Type of the image for the AI service.</param>
    /// <returns><see langword="false"/> if the image is inappropriate. <see langword="null"/> is the AI service is unavailable.</returns>
    public Task<bool?> CheckImageSafety(byte[] image, string filename);
}
