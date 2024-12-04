using AutoMapper;
using System.Linq;

namespace CitizenProposalApp;

internal sealed class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Post, PostQueryResponsePostDto>()
            .ForMember(dest => dest.AttachmentIds, options => options.MapFrom(src => src.Attachments.Select(attachment => attachment.Id)));
        CreateMap<User, UserQueryResponseDto>();
        CreateMap<Tag, TagQueryResponseDto>()
            .ForMember(dest => dest.TagType, options => options.MapFrom(src => src.TagType.Name));
    }
}
