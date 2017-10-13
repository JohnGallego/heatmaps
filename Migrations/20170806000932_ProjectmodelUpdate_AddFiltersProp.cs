using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace heatmaps.Migrations
{
    public partial class ProjectmodelUpdate_AddFiltersProp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Filters",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Filters",
                table: "Projects");
        }
    }
}
