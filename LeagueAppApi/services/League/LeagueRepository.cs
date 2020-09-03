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
        public LeagueRepository(LeagueAppContext context)
        {
            _context = context;
        }

        public IEnumerable<League> GetAllLeagues()
        {
            return _context.Leagues.Include(x => x.ParticipantSquads);
        }

        public League GetLeague(int id)
        {
            return _context.Leagues.Include(x => x.ParticipantSquads).FirstOrDefault(x => x.Id == id);
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
            _context.Leagues.Remove(league);
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