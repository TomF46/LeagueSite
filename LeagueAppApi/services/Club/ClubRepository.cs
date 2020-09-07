using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using LeagueAppApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LeagueAppApi.Services
{
    public class ClubRepository : IClubRepository
    {
        private LeagueAppContext _context;
        private readonly ISquadRepository _squadRepository;
        public ClubRepository(LeagueAppContext context, ISquadRepository squadRepository)
        {
            _context = context;
            _squadRepository = squadRepository;
        }

        public IEnumerable<Club> GetAllClubs()
        {
            return _context.Clubs.Where(x => !x.isDeleted);
        }

        public Club GetClub(int id)
        {
            return _context.Clubs.Include(x => x.Squads).FirstOrDefault(x => x.Id == id && !x.isDeleted);
        }

        public Club AddClub(ClubCreationDto clubDto)
        {
            var club = new Club
            {
                Name = clubDto.Name,
                Location = clubDto.Location
            };

            validate(club);


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
            var squadsToDelete = _context.Squads.Where(x => x.Club.Id == club.Id);
            squadsToDelete.ToList().ForEach(squad =>
            {
                _squadRepository.DeleteSquad(squad);
            });
            club.isDeleted = true;
            _context.SaveChanges();
        }

        public void UpdateClub(ClubUpdateDto club)
        {
            var clubToUpdate = GetClub(club.Id);
            clubToUpdate.Name = club.Name;
            clubToUpdate.Location = club.Location;
            validate(clubToUpdate);
            _context.SaveChanges();
            return;
        }

        private void validate(Club club)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(club, null, null);
            if (!Validator.TryValidateObject(club, context, results, true))
            {
                var message = "";
                results.ForEach(exception =>
                {
                    message = $"{message} {exception.ErrorMessage}";
                });
                throw new AppException(message);
            }
        }

    }
}