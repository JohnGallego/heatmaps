using heatmaps.Models.Projects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace heatmaps.Models.Datasets
{
  public class Dataset
  {    
    public int DatasetId { get; set; }    
    public int ProjectId { get; set; }
    public string Data { get; set; }
   
    public virtual Project Project { get; set; }
  }
}
