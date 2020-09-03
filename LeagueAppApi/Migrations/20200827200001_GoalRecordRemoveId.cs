using Microsoft.EntityFrameworkCore.Migrations;

namespace LeagueAppApi.Migrations
{
    public partial class GoalRecordRemoveId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "GoalRecords");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "GoalRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
