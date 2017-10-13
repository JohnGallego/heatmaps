using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace heatmaps.Models.Projects.Dto
{
  public class ProjectDto
  {
    [JsonProperty(PropertyName = "projectId")]
    public int ProjectId { get; set; }

    [Required]
    [JsonProperty(PropertyName = "russellId")]
    public string RussellId { get; set; }

    [Required]
    [JsonProperty(PropertyName = "name")]
    public string Name { get; set; }

    [MaxLength(250)]
    [JsonProperty(PropertyName = "description")]
    public string Description { get; set; }

    [JsonProperty(PropertyName = "respondents")]
    public int Respondents { get; set; }

    [JsonProperty(PropertyName = "concepts")]
    public int Concepts { get; set; }

    [JsonProperty(PropertyName = "filters")]
    public int Filters { get; set; }

    [JsonProperty(PropertyName = "heatMaps")]
    public int HeatMaps { get; set; }

    [JsonProperty(PropertyName = "creator")]
    public string Creator { get; set; }

    [JsonProperty(PropertyName = "dateCreated")]
    public DateTime DateCreated { get; set; }

    [JsonProperty(PropertyName = "dateUpdated")]
    public DateTime DateUpdated { get; set; }    
  }
}
