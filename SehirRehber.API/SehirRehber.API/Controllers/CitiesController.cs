using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SehirRehber.API.Data;
using SehirRehber.API.Dtos;
using SehirRehber.API.Models;

namespace SehirRehber.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private IAppRepository _appRepository;
        private IMapper _mapper;
        public CitiesController(IAppRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = _mapper;
        }

        public ActionResult GetCities()
        {
            #region Without AutoMapper
            //var cities = _appRepository.GetCities()
            //    .Select(c=>new CityForListDto { Description = c.Description, Id = c.Id, Name = c.Name, PhotoUrl=c.Photos.FirstOrDefault(p=>p.IsMain == true).Url})
            //    .ToList();
            #endregion

            #region With AutoMapper
            var cities = _appRepository.GetCities();
            //cities mapping to List of CityForListDto
            List<CityForListDto> citiesToReturn = new List<CityForListDto>();
            citiesToReturn = _mapper.Map<List<CityForListDto>>(cities);
            #endregion
            return Ok(citiesToReturn);
        }

        [HttpPost]
        [Route("add")] //api/cities/add olarak da gelirse
        public ActionResult Add([FromBody]City city)
        {
            _appRepository.Add(city);
            _appRepository.SaveAll();
            return Ok(city);
        }

        [HttpGet]
        [Route("detail")] //api/cities/detail
        public ActionResult GetCityById(int id)
        {

            var city = _appRepository.GetCityById(id);
            //cities mapping to List of CityForListDto
            var cityToReturn = _mapper.Map<CityForDetailDto>(city);
            
            return Ok(cityToReturn);
        }

        [HttpGet]
        [Route("Photos")]
        public ActionResult GetPhotosByCityId(int cityId)
        {
            var photos = _appRepository.GetPhotosByCity(cityId);
            return Ok(photos);
        }

    }
}