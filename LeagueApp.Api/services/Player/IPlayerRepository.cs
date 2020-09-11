using System.Collections.Generic;
namespace LeagueApp.Api.Services
{
    public interface IPlayerRepository
    {
        IEnumerable<Player> GetAllPlayers();

        Player GetPlayer(int id);
        Player AddPlayer(PlayerCreationDto player);
        bool Save();
        void DeletePlayer(Player player);
        void UpdatePlayer(PlayerUpdateDto player);

    }
}