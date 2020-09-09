using Microsoft.EntityFrameworkCore.Migrations;

namespace LeagueAppApi.Migrations
{
    public partial class AddIdToGoalRecord : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_GoalRecords",
                table: "GoalRecords");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Squads",
                maxLength: 40,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "GoalRecords",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GoalRecords",
                table: "GoalRecords",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_GoalRecords_PlayerId",
                table: "GoalRecords",
                column: "PlayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_GoalRecords",
                table: "GoalRecords");

            migrationBuilder.DropIndex(
                name: "IX_GoalRecords_PlayerId",
                table: "GoalRecords");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "GoalRecords");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Squads",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 40);

            migrationBuilder.AddPrimaryKey(
                name: "PK_GoalRecords",
                table: "GoalRecords",
                columns: new[] { "PlayerId", "FixtureId" });
        }
    }
}
