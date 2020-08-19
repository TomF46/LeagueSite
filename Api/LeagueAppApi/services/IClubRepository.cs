using System.Collections.Generic;
namespace LeagueAppApi.Services
{
    public interface IClubRepository
    {
        IEnumerable<Club> GetAllClubs();

        Club GetClub(int id);

    }
}