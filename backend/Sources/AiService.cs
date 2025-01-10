using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Globalization;
using Microsoft.AspNetCore.StaticFiles;
using System.Net.Mime;

namespace CitizenProposalApp;

/// <summary>
/// Default implementation of <see cref="IAiService"/>.
/// </summary>
/// <param name="httpClient">Injected <see cref="HttpClient"/> from <see cref="HttpClientFactoryServiceCollectionExtensions.AddHttpClient{TClient, TImplementation}(IServiceCollection, Action{HttpClient})"/>.</param>
internal sealed class AiService(HttpClient httpClient) : IAiService
{
    public async Task<IEnumerable<string>?> GuessTags(string title)
    {
        using FormUrlEncodedContent formContent = new(new Dictionary<string, string>
        {
            { "text", title }
        });
        HttpResponseMessage response = await httpClient.PostAsync(new Uri("classify", UriKind.Relative), formContent);
        if (!response.IsSuccessStatusCode)
        {
            return null;
        }
        AiGuessTagsResponseDto? responseObject = await JsonSerializer.DeserializeAsync<AiGuessTagsResponseDto>(await response.Content.ReadAsStreamAsync());
        if (responseObject is null)
        {
            return null;
        }
        return responseObject.DepartmentTags.Concat(responseObject.TopicTags ?? []);
    }

    public async Task<bool> AddPostToAiDb(int id, string title)
    {
        using FormUrlEncodedContent formContent = new(new Dictionary<string, string>
        {
            { "id", id.ToString(CultureInfo.InvariantCulture) },
            { "text", title }
        });
        HttpResponseMessage response = await httpClient.PostAsync(new Uri("add", UriKind.Relative), formContent);
        return response.IsSuccessStatusCode;
    }

    public async Task<IEnumerable<int>?> SearchPostIdsByTitle(string title, int postCount)
    {
        using FormUrlEncodedContent formContent = new(new Dictionary<string, string>
        {
            { "query", title },
            { "topk", postCount.ToString(CultureInfo.InvariantCulture) }
        });
        HttpResponseMessage response = await httpClient.PostAsync(new Uri("rank", UriKind.Relative), formContent);
        if (!response.IsSuccessStatusCode)
        {
            return null;
        }
        AiSearchPostsByTitleResponseDto? responseObject = await JsonSerializer.DeserializeAsync<AiSearchPostsByTitleResponseDto>(await response.Content.ReadAsStreamAsync());
        if (responseObject is null)
        {
            return null;
        }
        return responseObject.RankedResults.OrderBy(result => result.Distance).Select(result => result.PostId);
    }

    public async Task<bool?> CheckTextSafety(string text)
    {
        using FormUrlEncodedContent formContent = new(new Dictionary<string, string>
        {
            { "text", text }
        });
        HttpResponseMessage response = await httpClient.PostAsync(new Uri("text-moderation", UriKind.Relative), formContent);
        if (!response.IsSuccessStatusCode)
        {
            return null;
        }
        AiModerationResponseDto? responseObject = await JsonSerializer.DeserializeAsync<AiModerationResponseDto>(await response.Content.ReadAsStreamAsync());
        if (responseObject is null)
        {
            return null;
        }
        return !responseObject.IsUnsafe;
    }
    public async Task<bool?> CheckImageSafety(byte[] image, string filename)
    {
        using MultipartFormDataContent formContent = [];
        using ByteArrayContent imageContent = new(image);
        new FileExtensionContentTypeProvider().TryGetContentType(filename, out string? contentType);
        imageContent.Headers.ContentType = new(contentType ?? MediaTypeNames.Application.Octet);
        formContent.Add(imageContent, "file", filename);
        HttpResponseMessage response = await httpClient.PostAsync(new Uri("image-moderation", UriKind.Relative), formContent);
        if (!response.IsSuccessStatusCode)
        {
            return null;
        }
        AiModerationResponseDto? responseObject = await JsonSerializer.DeserializeAsync<AiModerationResponseDto>(await response.Content.ReadAsStreamAsync());
        if (responseObject is null)
        {
            return null;
        }
        return !responseObject.IsUnsafe;
    }
}
