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
        public async Task<ActionResult<Squad>> GetSquad(int id)
        {
            var squad = await _context.Squads.FindAsync(id);

            if (squad == null)
            {
                return NotFound();
            }

            return squad;
        }

        // PUT: api/Squads/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSquad(int id, Squad squad)
        {
            if (id != squad.Id)
            {
                return BadRequest();
            }

            _context.Entry(squad).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SquadExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Squads
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Squad>> PostSquad(SquadCreationDto squad)
        {
            var squadToStore = new Squad();
            squadToStore.Name = squad.Name;
            squadToStore.Club = _context.Clubs.FirstOrDefault(club => club.Id == squad.ClubId);
            _context.Squads.Add(squadToStore);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSquad", new { id = squadToStore.Id }, squadToStore);
        }

        // DELETE: api/Squads/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Squad>> DeleteSquad(int id)
        {
            var squad = await _context.Squads.FindAsync(id);
            if (squad == null)
            {
                return NotFound();
            }

            _context.Squads.Remove(squad);
            await _context.SaveChangesAsync();

            return squad;
        }

        private bool SquadExists(int id)
        {
            return _context.Squads.Any(e => e.Id == id);
        }
    }
}
