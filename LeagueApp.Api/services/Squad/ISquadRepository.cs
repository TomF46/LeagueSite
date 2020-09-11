using System.Collections.Generic;
namespace LeagueApp.Api.Services
{
    public interface ISquadRepository
    {
        IEnumerable<Squad> GetAllSquads();

        Squad GetSquad(int id);
        Squad AddSquad(SquadCreationDto squad);
        bool Save();
        void DeleteSquad(Squad squad);
        void UpdateSquad(SquadUpdateDto squad);
        Squad AddToLeague(AddToLeagueDto relation);
        Squad RemoveFromLeague(RemoveFromLeagueDto relation);


    }
}