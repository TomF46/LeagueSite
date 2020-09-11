using Microsoft.EntityFrameworkCore.Migrations;

namespace LeagueApp.Api.Migrations
{
    public partial class FixturCompleteFlag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fixtures_Seasons_seasonId",
                table: "Fixtures");

            migrationBuilder.RenameColumn(
                name: "seasonId",
                table: "Fixtures",
                newName: "SeasonId");

            migrationBuilder.RenameIndex(
                name: "IX_Fixtures_seasonId",
                table: "Fixtures",
                newName: "IX_Fixtures_SeasonId");

            migrationBuilder.AddColumn<bool>(
                name: "Complete",
                table: "Fixtures",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Fixtures_Seasons_SeasonId",
                table: "Fixtures",
                column: "SeasonId",
                principalTable: "Seasons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fixtures_Seasons_SeasonId",
                table: "Fixtures");

            migrationBuilder.DropColumn(
                name: "Complete",
                table: "Fixtures");

            migrationBuilder.RenameColumn(
                name: "SeasonId",
                table: "Fixtures",
                newName: "seasonId");

            migrationBuilder.RenameIndex(
                name: "IX_Fixtures_SeasonId",
                table: "Fixtures",
                newName: "IX_Fixtures_seasonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Fixtures_Seasons_seasonId",
                table: "Fixtures",
                column: "seasonId",
                principalTable: "Seasons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
