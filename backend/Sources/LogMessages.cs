using Microsoft.Extensions.Logging;

namespace CitizenProposalApp;

internal static partial class LogMessages
{
    [LoggerMessage(Level = LogLevel.Error, Message = "Failed to add the post with ID {id} and title \"{title}\" to the AI DB.")]
    public static partial void LogFailureToAddPostToAiDb(this ILogger logger, int id, string title);
}
