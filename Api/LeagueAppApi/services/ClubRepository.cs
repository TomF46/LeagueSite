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

        public Club AddClub(ClubCreationDto clubDto)
        {
            var club = new Club
            {
                Name = clubDto.Name,
                Location = clubDto.Location
            };
            _context.Clubs.Add(club);
            _context.SaveChanges();
            return club;
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void DeleteClub(Club club)
        {
            _context.Clubs.Remove(club);
        }

        public void UpdateClub(ClubUpdateDto club)
        {
            var clubToUpdate = GetClub(club.Id);
            clubToUpdate.Name = club.Name;
            clubToUpdate.Location = club.Location;
            _context.SaveChanges();
            return;
        }
    }
}