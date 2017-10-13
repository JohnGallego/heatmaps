using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace heatmaps.Models.Datasets.Dto
{
  public class DatasetDto
  {
    [JsonProperty(PropertyName = "datasetId")]
    public int? DatasetId { get; set; }

    [Required]
    [JsonProperty(PropertyName = "projectId")]
    public int ProjectId { get; set; }

    [Required]
    [JsonProperty(PropertyName = "data")]
    public string Data { get; set; }
  }
}
