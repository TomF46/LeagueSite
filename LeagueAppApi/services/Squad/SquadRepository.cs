using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
            return _context.Squads.Include(x => x.Club).Include(x => x.League).Where(x => !x.isDeleted);
        }

        public Squad GetSquad(int id)
        {
            return _context.Squads.Include(x => x.Club).Include(x => x.League).FirstOrDefault(x => x.Id == id && !x.isDeleted);
        }

        public Squad AddSquad(SquadCreationDto squadDto)
        {

            var parentClub = _context.Clubs.FirstOrDefault(club => club.Id == squadDto.ClubId && !club.isDeleted);
            if (parentClub == null) throw new Exception("Parent club does not exist"); //TODO return error nicely

            var squad = new Squad
            {
                Name = squadDto.Name,
                Club = parentClub
            };
            validate(squad);
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
            var playersToCascade = _context.Players.Where(player => player.Squad.Id == squad.Id);
            playersToCascade.ToList().ForEach(player =>
            {
                player.isDeleted = true;
            });
            squad.isDeleted = true;
            _context.SaveChanges();
        }

        public void UpdateSquad(SquadUpdateDto squad)
        {
            var squadToUpdate = GetSquad(squad.Id);
            squadToUpdate.Name = squad.Name;
            validate(squadToUpdate);
            _context.SaveChanges();
            return;
        }

        public Squad AddToLeague(AddToLeagueDto relation)
        {

            var squadToAdd = GetSquad(relation.SquadId);

            var league = _context.Leagues.FirstOrDefault(league => league.Id == relation.LeagueId);
            if (league == null) throw new Exception("League  does not exist"); //TODO return error nicely

            squadToAdd.League = league;
            _context.SaveChanges();
            return squadToAdd;
        }

        private void validate(Squad squad)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(squad, null, null);
            if (!Validator.TryValidateObject(squad, context, results, true))
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