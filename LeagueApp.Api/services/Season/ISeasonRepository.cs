using System.Collections.Generic;
namespace LeagueApp.Api.Services
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