using System.Linq;
using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Model;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User,UserForDetailedDto>()
            .ForMember(dest=>dest.PhotoUrl,opt=>opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url))
            .ForMember(dest=>dest.Age,opt=>opt.MapFrom(src=>src.DateOfBirth.CalculateAge()));

            CreateMap<User,UserForListDto>()
            .ForMember(dest=>dest.PhotoUrl,opt=>opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url))
            .ForMember(dest=>dest.Age,opt=>opt.MapFrom(src=>src.DateOfBirth.CalculateAge()));

            CreateMap<Photo,PhotosForDetailedDto>();  

            CreateMap<UserForUpdateDto,User>();                      

            CreateMap<Photo,PhotoForReturnDto>();

            CreateMap<PhotoForCreationDto,Photo>();

            CreateMap<UserForRegisterDto,User>();
        }                                                                                                                                                                                                                                                                            
    }
}