using Microsoft.EntityFrameworkCore.Migrations;

namespace LeagueApp.Api.Migrations
{
    public partial class GoalRecord : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GoalRecords",
                columns: table => new
                {
                    PlayerId = table.Column<int>(nullable: false),
                    FixtureId = table.Column<int>(nullable: false),
                    Id = table.Column<int>(nullable: false),
                    Side = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoalRecords", x => new { x.PlayerId, x.FixtureId });
                    table.ForeignKey(
                        name: "FK_GoalRecords_Fixtures_FixtureId",
                        column: x => x.FixtureId,
                        principalTable: "Fixtures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GoalRecords_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GoalRecords_FixtureId",
                table: "GoalRecords",
                column: "FixtureId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GoalRecords");
        }
    }
}
