using AutoMapper;
using heatmaps.Models.Datasets;
using heatmaps.Models.Datasets.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace heatmaps.Models.DtoMaps
{
  public class DatasetMappingProfile : Profile
  {
    public DatasetMappingProfile()
    {
      CreateMap<Dataset, DatasetDto>()
        .ReverseMap();      
    }
  }
}
