using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using LeagueApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LeagueApp.Api.Services
{
    public class PlayerRepository : IPlayerRepository
    {
        private LeagueAppContext _context;
        public PlayerRepository(LeagueAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Player> GetAllPlayers()
        {
            return _context.Players.Include(x => x.Club).Include(x => x.Squad).Where(x => !x.isDeleted);
        }

        public Player GetPlayer(int id)
        {
            return _context.Players.Include(x => x.Club).Include(x => x.Squad).FirstOrDefault(x => x.Id == id && !x.isDeleted);
        }

        public Player AddPlayer(PlayerCreationDto playerDto)
        {

            var parentClub = _context.Clubs.FirstOrDefault(club => club.Id == playerDto.ClubId && !club.isDeleted);
            if (parentClub == null) throw new AppException("Parent club does not exist"); //TODO return error nicely

            var parentSquad = _context.Squads.FirstOrDefault(squad => squad.Id == playerDto.SquadId && !squad.isDeleted);
            if (parentSquad == null) throw new AppException("Parent squad does not exist"); //TODO return error nicely


            var player = new Player
            {
                FirstName = playerDto.FirstName,
                LastName = playerDto.LastName,
                Position = playerDto.Position,
                Squad = parentSquad,
                Club = parentClub
            };

            validate(player);
            _context.Players.Add(player);
            _context.SaveChanges();
            return player;

        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void DeletePlayer(Player player)
        {
            player.isDeleted = true;
            _context.SaveChanges();
        }

        public void UpdatePlayer(PlayerUpdateDto player)
        {
            var playerToUpdate = GetPlayer(player.Id);
            playerToUpdate.FirstName = player.FirstName;
            playerToUpdate.LastName = player.LastName;
            playerToUpdate.Position = player.Position;
            validate(playerToUpdate);
            _context.SaveChanges();
            return;
        }

        private void validate(Player player)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(player, null, null);
            if (!Validator.TryValidateObject(player, context, results, true))
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