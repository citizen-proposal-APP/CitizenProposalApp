using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

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
}
