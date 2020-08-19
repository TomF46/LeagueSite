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
    public class SquadsController : ControllerBase
    {
        private readonly LeagueAppContext _context;
        private readonly ISquadRepository _squadRepository;

        public SquadsController(LeagueAppContext context, ISquadRepository squadRepository)
        {
            _context = context;
            _squadRepository = squadRepository;
        }

        // GET: api/Squads
        [HttpGet]
        public ActionResult<IEnumerable<SquadSimpleDto>> GetSquads()
        {
            var squads = _squadRepository.GetAllSquads();
            var squadsDto = squads.Select(squad => new SquadSimpleDto
            {
                Id = squad.Id,
                Name = squad.Name,
                ClubId = squad.Club.Id
            });


            return Ok(squadsDto);
        }

        // GET: api/Squads/5
        [HttpGet("{id}")]
        public ActionResult<Squad> GetSquad(int id)
        {
            var squad = _squadRepository.GetSquad(id);

            if (squad == null)
            {
                return NotFound();
            }

            return Ok(squad);
        }

        // PUT: api/Squads/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public IActionResult PutSquad(SquadUpdateDto squad)
        {
            var squadToUpdate = _squadRepository.GetSquad(squad.Id);

            if (squadToUpdate == null) return NotFound();

            _squadRepository.UpdateSquad(squad);

            if (!_squadRepository.Save()) throw new Exception("Failed to update squad");

            return Ok(squad);

        }

        // POST: api/Squads
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public ActionResult<Squad> PostSquad(SquadCreationDto squad)
        {
            var savedObject = _squadRepository.AddSquad(squad);
            if (!_squadRepository.Save()) throw new Exception("Failed to create squad");

            return CreatedAtAction("GetSquad", new { id = savedObject.Id }, new SquadSimpleDto { Id = savedObject.Id, Name = savedObject.Name, ClubId = savedObject.Club.Id });
        }

        // DELETE: api/Squads/5
        [HttpDelete("{id}")]
        public ActionResult<Squad> DeleteSquad(int id)
        {
            var squad = _squadRepository.GetSquad(id);
            if (squad == null)
            {
                return NotFound();
            }

            _squadRepository.DeleteSquad(squad);
            if (!_squadRepository.Save()) throw new Exception("Failed to delete squad");

            return squad;
        }

        private bool SquadExists(int id)
        {
            return _context.Squads.Any(e => e.Id == id);
        }
    }
}
