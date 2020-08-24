using System.Collections.Generic;
namespace LeagueAppApi.Services
{
    public interface ISeasonRepository
    {
        IEnumerable<Season> GetAllSeasons();

        Season GetSeason(int id);
        Season AddSeason(SeasonCreationDto season);
        bool Save();
        void DeleteSeason(Season season);
        void UpdateSeason(SeasonUpdateDto season);

    }
}