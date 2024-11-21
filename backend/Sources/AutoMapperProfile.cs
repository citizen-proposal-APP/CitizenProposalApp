using AutoMapper;

namespace CitizenProposalApp;

internal class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Post, PostDto>();
        CreateMap<User, UserDto>();
        CreateMap<Tag, TagDto>()
            .ForMember(dest => dest.TagType, options => options.MapFrom(src => src.TagType.Name));
    }
}
