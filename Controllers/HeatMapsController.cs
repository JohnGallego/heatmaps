using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using heatmaps.Repositories;
using heatmaps.Models.HeatMaps;
using Microsoft.EntityFrameworkCore;
using heatmaps.Models.HeatMaps.Dto;
using heatmaps.Models.Projects;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace heatmaps.Controllers
{
  [Route("api/[controller]")]
  public class HeatMapsController : Controller
  {
    private readonly IMapper mapper;
    private readonly HeatmapsDbContext context;

    public HeatMapsController(IMapper mapper, HeatmapsDbContext context)
    {
      this.mapper = mapper;
      this.context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      IQueryable<HeatMap> query = context.HeatMaps
        .Include(d => d.Project)
        .OrderBy(d => d.Project.DateCreated)
        .AsNoTracking();

      var heatMaps = await query.ToListAsync();

      return Ok(mapper.Map<List<HeatMapDto>>(heatMaps));
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int? id)
    {
      if (id == null || id <= 0)
      {
        return NotFound();
      }

      IQueryable<HeatMap> query = context.HeatMaps
        .Where(h => h.ProjectId == id)
        .AsNoTracking();

      var heatMaps = await query.ToListAsync();

      return Ok(mapper.Map<List<HeatMapDto>>(heatMaps));
    }


    [HttpPost("{id}")]
    public async Task<IActionResult> Post(int? id, [FromBody]HeatMapDto heatMap)
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
        HeatMap heatMapToInsert = mapper.Map<HeatMap>(heatMap);

        context.HeatMaps.Add(heatMapToInsert);
        projectToUpdate.DateUpdated = DateTime.Now;

        await context.SaveChangesAsync();

        return Ok(mapper.Map<HeatMapDto>(heatMapToInsert));
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
