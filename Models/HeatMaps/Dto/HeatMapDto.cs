using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace heatmaps.Models.HeatMaps.Dto
{
  public class HeatMapDto
  {
    [JsonProperty(PropertyName = "heatMapId")]
    public int HeatMapId { get; set; }

    [Required]
    [JsonProperty(PropertyName = "projectId")]
    public int ProjectId { get; set; }

    [Required]
    [JsonProperty(PropertyName = "payload")]
    public string Payload { get; set; }
  }
}
