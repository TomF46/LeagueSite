using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LeagueApp.Api.Migrations
{
    public partial class AddBasicFixture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Fixtures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(nullable: true),
                    seasonId = table.Column<int>(nullable: true),
                    HomeTeamId = table.Column<int>(nullable: true),
                    AwayTeamId = table.Column<int>(nullable: true),
                    HomeScore = table.Column<int>(nullable: false),
                    AwayScore = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fixtures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Fixtures_Squads_AwayTeamId",
                        column: x => x.AwayTeamId,
                        principalTable: "Squads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Fixtures_Squads_HomeTeamId",
                        column: x => x.HomeTeamId,
                        principalTable: "Squads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Fixtures_Seasons_seasonId",
                        column: x => x.seasonId,
                        principalTable: "Seasons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Fixtures_AwayTeamId",
                table: "Fixtures",
                column: "AwayTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Fixtures_HomeTeamId",
                table: "Fixtures",
                column: "HomeTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Fixtures_seasonId",
                table: "Fixtures",
                column: "seasonId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Fixtures");
        }
    }
}
