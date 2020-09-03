using Microsoft.EntityFrameworkCore.Migrations;

namespace LeagueAppApi.Migrations
{
    public partial class AddLeagues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LeagueId",
                table: "Squads",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Leagues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leagues", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Squads_LeagueId",
                table: "Squads",
                column: "LeagueId");

            migrationBuilder.AddForeignKey(
                name: "FK_Squads_Leagues_LeagueId",
                table: "Squads",
                column: "LeagueId",
                principalTable: "Leagues",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Squads_Leagues_LeagueId",
                table: "Squads");

            migrationBuilder.DropTable(
                name: "Leagues");

            migrationBuilder.DropIndex(
                name: "IX_Squads_LeagueId",
                table: "Squads");

            migrationBuilder.DropColumn(
                name: "LeagueId",
                table: "Squads");
        }
    }
}
