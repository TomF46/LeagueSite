using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using LeagueAppApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LeagueAppApi.Services
{
    public class LeagueRepository : ILeagueRepository
    {
        private LeagueAppContext _context;
        private readonly ISeasonRepository _seasonRepository;
        public LeagueRepository(LeagueAppContext context, ISeasonRepository seasonRepository)
        {
            _context = context;
            _seasonRepository = seasonRepository;
        }

        public IEnumerable<League> GetAllLeagues()
        {
            return _context.Leagues.Include(x => x.ParticipantSquads).Where(x => !x.isDeleted);
        }

        public League GetLeague(int id)
        {
            return _context.Leagues.Include(x => x.ParticipantSquads).ThenInclude(x => x.Club).FirstOrDefault(x => x.Id == id && !x.isDeleted);
        }

        public League AddLeague(LeagueCreationDto leagueDto)
        {
            var league = new League
            {
                Name = leagueDto.Name,
                ParticipantSquads = new Collection<Squad>(),
            };
            _context.Leagues.Add(league);
            _context.SaveChanges();
            return league;
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void DeleteLeague(League league)
        {
            var seasonsToDelete = _context.Seasons.Where(x => x.League.Id == league.Id);
            seasonsToDelete.ToList().ForEach(season =>
            {
                _seasonRepository.DeleteSeason(season);
            });
            league.isDeleted = true;
            _context.SaveChanges();
        }

        public void UpdateLeague(LeagueUpdateDto league)
        {
            var leagueToUpdate = GetLeague(league.Id);
            leagueToUpdate.Name = league.Name;
            _context.SaveChanges();
            return;
        }
    }
}