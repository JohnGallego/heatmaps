using AutoMapper;
using heatmaps.Models.Projects;
using heatmaps.Models.Projects.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace heatmaps.Models.DtoMaps
{
  public class ProjectMappingProfile : Profile
  {
    public ProjectMappingProfile()
    {
      CreateMap<Project, ProjectDto>()
        .ReverseMap();
    }
  }
}
