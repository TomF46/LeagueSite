using System.Collections.Generic;
using System.Linq;
using LeagueAppApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LeagueAppApi.Services
{
    public class ClubRepository : IClubRepository
    {
        private LeagueAppContext _context;
        public ClubRepository(LeagueAppContext context)
        {
            _context = context;
        }
        public IEnumerable<Club> GetAllClubs()
        {
            return _context.Clubs;
        }

        public Club GetClub(int id)
        {
            return _context.Clubs.Include(x => x.Squads).FirstOrDefault(x => x.Id == id);
        }

    }
}