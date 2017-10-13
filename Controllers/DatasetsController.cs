using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using heatmaps.Repositories;
using heatmaps.Models.Datasets;
using Microsoft.EntityFrameworkCore;
using heatmaps.Models.Datasets.Dto;
using heatmaps.Models.Projects;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace heatmaps.Controllers
{

  [Route("api/[controller]")]
  public class DatasetsController : Controller
  {

    private readonly IMapper mapper;
    private readonly HeatmapsDbContext context;

    public DatasetsController(IMapper mapper, HeatmapsDbContext context)
    {
      this.mapper = mapper;
      this.context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      IQueryable<Dataset> query = context.Datasets
        .Include(d => d.Project)
        .OrderBy(d => d.Project.DateCreated)
        .AsNoTracking();

      var datasets = await query.ToListAsync();

      return Ok(mapper.Map<List<DatasetDto>>(datasets));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int? id)
    {
      if (id == null || id <= 0)
      {
        return NotFound();
      }

      IQueryable<Dataset> query = context.Datasets        
        .Where(d => d.ProjectId == id)        
        .AsNoTracking();

      var dataset = await query.FirstOrDefaultAsync();

      if (dataset == null)
      {
        return NotFound();
      }

      return Ok(mapper.Map<DatasetDto>(dataset));

    }


    [HttpPost("{id}")]
    public async Task<IActionResult> Post(int? id, [FromBody]DatasetDto dataset)
    {
      if (id == null || id <= 0)
      {
        return NotFound();
      }

      if (ModelState.IsValid)
      {
        Project projectToUpdate = await context.Projects
          .SingleOrDefaultAsync(p => p.ProjectId == id);

        if (projectToUpdate == null)
        {
          return NotFound();
        }

        Dataset mappedDataset = mapper.Map<Dataset>(dataset);
        Dataset datasetToUpdate = await context.Datasets
          .SingleOrDefaultAsync(d => d.ProjectId == id);

        if (datasetToUpdate == null)
        {          
          datasetToUpdate = new Dataset();          
          datasetToUpdate.ProjectId = id ?? default(int);
          datasetToUpdate.Data = mappedDataset.Data;          
          context.Datasets.Add(datasetToUpdate);
        } else
        {
          datasetToUpdate.Data = mappedDataset.Data;
        }

        projectToUpdate.DateUpdated = DateTime.Now;

        await context.SaveChangesAsync();
        return Ok(mapper.Map<DatasetDto>(datasetToUpdate));
      }

      return BadRequest(ModelState);
    }


    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }


    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
