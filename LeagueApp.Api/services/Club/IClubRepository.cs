using System.Collections.Generic;
namespace LeagueApp.Api.Services
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