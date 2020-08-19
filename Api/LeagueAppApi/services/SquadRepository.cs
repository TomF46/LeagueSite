using System;
using System.Collections.Generic;
using System.Linq;
using LeagueAppApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LeagueAppApi.Services
{
    public class SquadRepository : ISquadRepository
    {
        private LeagueAppContext _context;
        public SquadRepository(LeagueAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Squad> GetAllSquads()
        {
            return _context.Squads.Include(x => x.Club);
        }

        public Squad GetSquad(int id)
        {
            return _context.Squads.Include(x => x.Club).FirstOrDefault(x => x.Id == id);
        }

        public Squad AddSquad(SquadCreationDto squadDto)
        {

            var parentClub = _context.Clubs.FirstOrDefault(club => club.Id == squadDto.ClubId);
            if (parentClub == null) throw new Exception("Parent club does not exist"); //TODO return error nicely

            var squad = new Squad
            {
                Name = squadDto.Name,
                Club = parentClub
            };
            _context.Squads.Add(squad);
            _context.SaveChanges();
            return squad;

        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void DeleteSquad(Squad squad)
        {
            _context.Squads.Remove(squad);
        }
    }
}