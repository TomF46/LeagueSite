using System.Collections.Generic;
namespace LeagueAppApi.Services
{
    public interface IClubRepository
    {
        IEnumerable<Club> GetAllClubs();

        Club GetClub(int id);
        Club AddClub(ClubCreationDto club);
        bool Save();
        void DeleteClub(Club club);
        void UpdateClub(ClubUpdateDto club);
    }
}