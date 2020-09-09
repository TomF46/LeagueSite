
namespace LeagueAppApi.Services
{
    public interface IStatsService
    {
        SeasonStats GetStats(int seasonId);
    }
}