using heatmaps.Models.Projects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace heatmaps.Models.HeatMaps
{
  public class HeatMap
  {
    public int HeatMapId { get; set; }
    public int ProjectId { get; set; }
    public string Payload { get; set; }

    public virtual Project Project { get; set; }
  }
}
