using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using heatmaps.Models.Projects;
using Microsoft.EntityFrameworkCore;
using heatmaps.Models.Datasets;
using heatmaps.Models.HeatMaps;

namespace heatmaps.Repositories
{
  public class HeatmapsDbContext : DbContext
  {
    public HeatmapsDbContext(DbContextOptions<HeatmapsDbContext> options) : base(options) { }

    public DbSet<Project> Projects { get; set; }
    public DbSet<Dataset> Datasets { get; set; }    
    public DbSet<HeatMap> HeatMaps { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<Project>()
            .HasOne(p => p.Dataset)
            .WithOne(d => d.Project);

      modelBuilder.Entity<Project>()
            .HasMany(p => p.HeatMapsCollection)
            .WithOne(d => d.Project);

    }
  }
}
