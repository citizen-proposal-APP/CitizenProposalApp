using AutoMapper;
using System.Linq;

namespace CitizenProposalApp;

internal sealed class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Post, PostQueryResponseDto>()
            .ForMember(dest => dest.AttachmentIds, options => options.MapFrom(src => src.Attachments.Select(attachment => attachment.Id)));
        CreateMap<User, UserQueryResponseDto>();
        CreateMap<Tag, TagQueryResponseDto>()
            .ForMember(dest => dest.TagType, options => options.MapFrom(src => src.TagType.Name));
        CreateMap<Comment, CommentQueryResponseDto>()
            .ForMember(dest => dest.ParentPostId, options => options.MapFrom(src => src.ParentPost.Id));
    }
}
