using AutoMapper;

namespace CitizenProposalApp;

internal sealed class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Post, PostQueryDto>();
        CreateMap<User, UserQueryDto>();
        CreateMap<Tag, TagQueryDto>()
            .ForMember(dest => dest.TagType, options => options.MapFrom(src => src.TagType.Name));
    }
}
