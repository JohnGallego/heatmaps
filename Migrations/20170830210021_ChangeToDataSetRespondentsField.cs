using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace heatmaps.Migrations
{
    public partial class ChangeToDataSetRespondentsField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RespondentData",
                table: "Datasets");

            migrationBuilder.AddColumn<string>(
                name: "Respondents",
                table: "Datasets",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Respondents",
                table: "Datasets");

            migrationBuilder.AddColumn<string>(
                name: "RespondentData",
                table: "Datasets",
                nullable: true);
        }
    }
}
