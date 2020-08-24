using System;
using System.Collections.Generic;
using System.Linq;
using LeagueAppApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LeagueAppApi.Services
{
    public class SeasonRepository : ISeasonRepository
    {
        private LeagueAppContext _context;
        public SeasonRepository(LeagueAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Season> GetAllSeasons()
        {
            return _context.Seasons.Include(x => x.League);
        }

        public Season GetSeason(int id)
        {
            return _context.Seasons.Include(x => x.League).FirstOrDefault(x => x.Id == id);
        }

        public Season AddSeason(SeasonCreationDto seasonDto)
        {

            //TODO create fixtures

            var season = new Season
            {
                Name = seasonDto.Name,
                Active = seasonDto.Active
            };
            _context.Seasons.Add(season);
            _context.SaveChanges();
            return season;

        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void DeleteSeason(Season season)
        {
            _context.Seasons.Remove(season);
        }

        public void UpdateSeason(SeasonUpdateDto season)
        {
            var seasonToUpdate = GetSeason(season.Id);
            seasonToUpdate.Name = season.Name;
            seasonToUpdate.Active = season.Active;
            _context.SaveChanges();
            return;
        }
    }
}