using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.IO;
using AutoMapper;
using heatmaps.Models.DtoMaps;
using Microsoft.EntityFrameworkCore;
using heatmaps.Repositories;

namespace heatmaps
{
  public class Startup
  {

    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration, IHostingEnvironment env)
    {
      Configuration = configuration;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc();
            
      services.AddAutoMapper(cfg => {
        cfg.AddProfile<ProjectMappingProfile>();
        cfg.AddProfile<DatasetMappingProfile>();
        cfg.AddProfile<HeatMapMappingProfile>();
      });

      var connection = Configuration["sql-dev"];
      services.AddDbContext<HeatmapsDbContext>(options => options.UseSqlServer(connection));
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.Use(async (context, next) =>
      {
        await next();

              // If there's no available file and the request doesn't contain an extension, we're probably trying to access a page.
              // Rewrite request to use app root
              if (context.Response.StatusCode == 404 &&
                  !Path.HasExtension(context.Request.Path.Value) &&
                  !context.Request.Path.Value.StartsWith("/api"))
        {
          context.Request.Path = "/index.html";
          context.Response.StatusCode = 200; // Make sure we update the status code, otherwise it returns 404
                await next();
        }
      });

      app.UseMvc();
      app.UseDefaultFiles();
      app.UseStaticFiles();
    }
  }
}
