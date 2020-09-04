using System;
using System.Collections.Generic;
using System.Linq;
using LeagueAppApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LeagueAppApi.Services
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
            if (parentClub == null) throw new Exception("Parent club does not exist"); //TODO return error nicely

            var parentSquad = _context.Squads.FirstOrDefault(squad => squad.Id == playerDto.SquadId && !squad.isDeleted);
            if (parentSquad == null) throw new Exception("Parent squad does not exist"); //TODO return error nicely


            var player = new Player
            {
                FirstName = playerDto.FirstName,
                LastName = playerDto.LastName,
                Position = playerDto.Position,
                Squad = parentSquad,
                Club = parentClub
            };
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
            _context.SaveChanges();
            return;
        }
    }
}