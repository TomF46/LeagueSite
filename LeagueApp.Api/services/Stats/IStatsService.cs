
namespace LeagueApp.Api.Services
{
    public interface IStatsService
    {
        SeasonStats GetStats(int seasonId);
    }
}