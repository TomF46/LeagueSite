using Microsoft.EntityFrameworkCore.Migrations;

namespace LeagueAppApi.Migrations
{
    public partial class AddIsDeletedToClub : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "Clubs",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Clubs");
        }
    }
}
