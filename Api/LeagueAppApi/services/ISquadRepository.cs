using System.Collections.Generic;
namespace LeagueAppApi.Services
{
    public interface ISquadRepository
    {
        IEnumerable<Squad> GetAllSquads();

        Squad GetSquad(int id);
        Squad AddSquad(SquadCreationDto squad);
        bool Save();
        void DeleteSquad(Squad squad);

    }
}