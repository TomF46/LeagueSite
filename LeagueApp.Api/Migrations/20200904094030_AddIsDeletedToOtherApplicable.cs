using Microsoft.EntityFrameworkCore.Migrations;

namespace LeagueApp.Api.Migrations
{
    public partial class AddIsDeletedToOtherApplicable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "Squads",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "Seasons",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "Players",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "Leagues",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "Fixtures",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Squads");

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Seasons");

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Leagues");

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Fixtures");
        }
    }
}
