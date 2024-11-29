using AutoMapper;

namespace CitizenProposalApp;

internal sealed class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Post, PostQueryResponseDto>();
        CreateMap<User, UserQueryResponseDto>();
        CreateMap<Tag, TagQueryResponseDto>()
            .ForMember(dest => dest.TagType, options => options.MapFrom(src => src.TagType.Name));
    }
}
