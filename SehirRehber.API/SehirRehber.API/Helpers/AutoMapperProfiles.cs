using AutoMapper;
using SehirRehber.API.Dtos;
using SehirRehber.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SehirRehber.API.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        private readonly object _mapper;

        public AutoMapperProfiles()
        {
            //dest => DTO : CityForListDto
            //src => City class
            AllowNullCollections = true;
            CreateMap<City, CityForListDto>()
                .ForMember(dest=>dest.PhotoUrl,opt=> {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                 });

            CreateMap<City, CityForDetailDto>();
            CreateMap<PhotoForCreationDto,Photo>();
            CreateMap<PhotoForReturnDto, Photo>();
        

        }
    }
}
