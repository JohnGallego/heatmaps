using AutoMapper;
using heatmaps.Models.HeatMaps;
using heatmaps.Models.HeatMaps.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace heatmaps.Models.DtoMaps
{
  public class HeatMapMappingProfile : Profile
  {
    public HeatMapMappingProfile()
    {
      CreateMap<HeatMap, HeatMapDto>()
        .ReverseMap();
    }
  }
}
