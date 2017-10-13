using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace heatmaps.Migrations
{
    public partial class RevertToSimplerDatasetModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Concepts");

            migrationBuilder.DropTable(
                name: "DataFilters");

            migrationBuilder.DropColumn(
                name: "Respondents",
                table: "Datasets");

            migrationBuilder.AddColumn<string>(
                name: "Data",
                table: "Datasets",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Data",
                table: "Datasets");

            migrationBuilder.AddColumn<string>(
                name: "Respondents",
                table: "Datasets",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Concepts",
                columns: table => new
                {
                    ConceptId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DatasetId = table.Column<int>(nullable: false),
                    Image = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Concepts", x => x.ConceptId);
                    table.ForeignKey(
                        name: "FK_Concepts_Datasets_DatasetId",
                        column: x => x.DatasetId,
                        principalTable: "Datasets",
                        principalColumn: "DatasetId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DataFilters",
                columns: table => new
                {
                    DataFilterId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DatasetId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Options = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataFilters", x => x.DataFilterId);
                    table.ForeignKey(
                        name: "FK_DataFilters_Datasets_DatasetId",
                        column: x => x.DatasetId,
                        principalTable: "Datasets",
                        principalColumn: "DatasetId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Concepts_DatasetId",
                table: "Concepts",
                column: "DatasetId");

            migrationBuilder.CreateIndex(
                name: "IX_DataFilters_DatasetId",
                table: "DataFilters",
                column: "DatasetId");
        }
    }
}
