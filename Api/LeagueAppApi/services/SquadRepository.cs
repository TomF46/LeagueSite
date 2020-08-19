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
    }
}