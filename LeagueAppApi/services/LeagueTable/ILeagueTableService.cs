
namespace LeagueAppApi.Services
{
    public interface ILeagueTableService
    {
        LeagueTableDto GenerateTable(Season season);
    }
}