using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeagueAppApi.Models;
using LeagueAppApi.Services;

namespace LeagueAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransfersController : ControllerBase
    {
        private readonly ITransferRepository _transferRepository;

        public TransfersController(ITransferRepository transferRepository)
        {
            _transferRepository = transferRepository;
        }

        // GET: api/Transfers
        [HttpGet]
        public ActionResult<IEnumerable<TransferSimpleDto>> GetTransfers()
        {
            var transfers = _transferRepository.GetAllTransfers();
            var transfersDto = transfers.Select(transfer => new TransferSimpleDto
            {
                Id = transfer.Id,
                PlayerId = transfer.Player.Id,
                PlayerDisplayName = transfer.Player.FirstName + " " + transfer.Player.LastName,
                FromSquadId = transfer.FromSquad.Id,
                FromSquadDisplayName = transfer.FromSquad.Club.Name + " " + transfer.FromSquad.Name,
                ToSquadId = transfer.ToSquad.Id,
                ToSquadDisplayName = transfer.ToSquad.Club.Name + " " + transfer.ToSquad.Name
            });


            return Ok(transfersDto);
        }

        // GET: api/Transfers/5
        [HttpGet("{id}")]
        public ActionResult<Transfer> GetTransfer(int id)
        {
            var transfer = _transferRepository.GetTransfer(id);

            if (transfer == null)
            {
                return NotFound();
            }

            return Ok(transfer);
        }

        // POST: api/Transfers
        [HttpPost]
        public ActionResult<Transfer> PostTransfer(TransferCreationDto transfer)
        {
            var savedObject = _transferRepository.AddTransfer(transfer);
            if (!_transferRepository.Save()) throw new Exception("Failed to create transfer");

            return CreatedAtAction("GetTransfer", new { id = savedObject.Id }, new TransferSimpleDto
            {
                Id = savedObject.Id,
                PlayerId = savedObject.Player.Id,
                PlayerDisplayName = savedObject.Player.FirstName + " " + savedObject.Player.LastName,
                FromSquadId = savedObject.FromSquad.Id,
                FromSquadDisplayName = savedObject.FromSquad.Club.Name + " " + savedObject.FromSquad.Name,
                ToSquadId = savedObject.ToSquad.Id,
                ToSquadDisplayName = savedObject.ToSquad.Club.Name + " " + savedObject.ToSquad.Name
            });
        }

    }
}
