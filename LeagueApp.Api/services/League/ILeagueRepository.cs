using System.Collections.Generic;
namespace LeagueApp.Api.Services
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