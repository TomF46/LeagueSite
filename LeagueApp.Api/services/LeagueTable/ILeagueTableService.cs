
namespace LeagueApp.Api.Services
{
    public interface ILeagueTableService
    {
        LeagueTableDto GenerateTable(Season season);
    }
}