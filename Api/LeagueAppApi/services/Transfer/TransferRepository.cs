using System;
using System.Collections.Generic;
using System.Linq;
using LeagueAppApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LeagueAppApi.Services
{
    public class TransferRepository : ITransferRepository
    {
        private LeagueAppContext _context;
        public TransferRepository(LeagueAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Transfer> GetAllTransfers()
        {
            return _context.Transfers.Include(x => x.Player).Include(x => x.FromSquad).ThenInclude(x => x.Club).Include(x => x.ToSquad).ThenInclude(x => x.Club);
        }

        public Transfer GetTransfer(int id)
        {
            return _context.Transfers.Include(x => x.Player).Include(x => x.FromSquad).Include(x => x.ToSquad).FirstOrDefault(x => x.Id == id);
        }

        public Transfer AddTransfer(TransferCreationDto transferDto)
        {

            var player = _context.Players.FirstOrDefault(player => player.Id == transferDto.PlayerId);
            if (player == null) throw new Exception("Player  does not exist"); //TODO return error nicely

            var fromSquad = _context.Squads.Include(x => x.Club).FirstOrDefault(squad => squad.Id == transferDto.FromSquadId);
            if (fromSquad == null) throw new Exception("from Squad does not exist");

            var toSquad = _context.Squads.Include(x => x.Club).FirstOrDefault(squad => squad.Id == transferDto.ToSquadId);
            if (toSquad == null) throw new Exception("to Squad does not exist");

            player.Club = toSquad.Club;
            player.Squad = toSquad;

            var transfer = new Transfer
            {
                Player = player,
                FromSquad = fromSquad,
                ToSquad = toSquad,
                DateCreated = DateTime.Now
            };
            _context.Transfers.Add(transfer);
            _context.SaveChanges();
            return transfer;

        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

    }
}