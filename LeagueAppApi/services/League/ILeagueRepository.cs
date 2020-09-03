using System.Collections.Generic;
namespace LeagueAppApi.Services
{
    public interface ILeagueRepository
    {
        IEnumerable<League> GetAllLeagues();

        League GetLeague(int id);
        League AddLeague(LeagueCreationDto league);
        bool Save();
        void DeleteLeague(League league);
        void UpdateLeague(LeagueUpdateDto league);

    }
}