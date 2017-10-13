using heatmaps.Models.Datasets;
using heatmaps.Models.HeatMaps;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace heatmaps.Models.Projects
{
  public class Project
  {
    public int ProjectId { get; set; }
    public string RussellId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Respondents { get; set; }
    public int Concepts { get; set; }
    public int Filters { get; set; }
    public int HeatMaps { get; set; }
    public string Creator { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }

    public virtual Dataset Dataset { get; set; }
    public virtual List<HeatMap> HeatMapsCollection { get; set; }
  }
}
