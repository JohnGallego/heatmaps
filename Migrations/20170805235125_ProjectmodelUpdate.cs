using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace heatmaps.Migrations
{
    public partial class ProjectmodelUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Respondents",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Respondents",
                table: "Projects");
        }
    }
}
