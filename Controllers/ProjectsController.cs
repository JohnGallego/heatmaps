using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using heatmaps.Models.Projects.Dto;
using AutoMapper;
using heatmaps.Models.Projects;
using heatmaps.Repositories;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace heatmaps.Controllers
{
  [Route("api/[controller]")]
  public class ProjectsController : Controller
  {
    private readonly IMapper mapper;
    private readonly HeatmapsDbContext context;

    public ProjectsController(IMapper mapper, HeatmapsDbContext context)
    {
      this.mapper = mapper;
      this.context = context;
    }
        
    [HttpGet]
    public async Task<IActionResult> Get()
    {
      IQueryable<Project> query = context.Projects
        .OrderBy(p => p.DateCreated)
        .AsNoTracking();

      var projects = await query.ToListAsync();

      return Ok(mapper.Map<List<ProjectDto>>(projects));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int? id)
    {
      if (id == null || id <= 0)
      {
        return NotFound();
      }

      IQueryable<Project> query = context.Projects
        .Where(p => p.ProjectId == id)
        .AsNoTracking();

      var project = await query.SingleOrDefaultAsync();

      if (project == null)
      {
        return NotFound();
      }

      return Ok(mapper.Map<ProjectDto>(project));

    }
    
    [HttpPost]
    public async Task<IActionResult> Post([FromBody]ProjectDto project)
    {
      if (ModelState.IsValid)
      {
        project.Concepts = 0;
        project.HeatMaps = 0;
        project.Creator = "None";
        project.DateCreated = DateTime.Now;
        project.DateUpdated = DateTime.Now;

        Project entity = mapper.Map<Project>(project);
        context.Projects.Add(entity);
        await context.SaveChangesAsync();
        return Created($"/api/projects/{entity.ProjectId}", this.mapper.Map<ProjectDto>(entity));
      }

      return BadRequest(ModelState);
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int? id, [FromBody]ProjectDto project)
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

        projectToUpdate.RussellId = project.RussellId;
        projectToUpdate.Name = project.Name;
        projectToUpdate.Description = project.Description;
        projectToUpdate.DateUpdated = DateTime.Now;

        await context.SaveChangesAsync();
        return Ok(mapper.Map<ProjectDto>(projectToUpdate));
      }

      return BadRequest(ModelState);
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
