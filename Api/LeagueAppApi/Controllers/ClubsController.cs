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
    public class ClubsController : ControllerBase
    {
        private readonly LeagueAppContext _context;
        private readonly IClubRepository _clubRepository;

        public ClubsController(LeagueAppContext context, IClubRepository clubRepository)
        {
            _context = context;
            _clubRepository = clubRepository;
        }

        // GET: api/Clubs
        [HttpGet]
        public ActionResult<IEnumerable<ClubSimpleDto>> GetClubs()
        {
            var clubs = _clubRepository.GetAllClubs();
            var clubsDto = clubs.Select(club => new ClubSimpleDto
            {
                Id = club.Id,
                Name = club.Name,
                Location = club.Location
            });

            return Ok(clubsDto);
        }

        // GET: api/Clubs/5
        [HttpGet("{id}")]
        public ActionResult<Club> GetClub(int id)
        {
            var club = _clubRepository.GetClub(id);

            if (club == null)
            {
                return NotFound();
            }

            return Ok(club);
        }

        // PUT: api/Clubs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClub(int id, Club club)
        {
            if (id != club.Id)
            {
                return BadRequest();
            }

            _context.Entry(club).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClubExists(id))
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

        // POST: api/Clubs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public ActionResult<Club> PostClub(ClubCreationDto club)
        {

            var createdClub = _clubRepository.AddClub(club);
            if (!_clubRepository.Save()) throw new Exception("Failed to create club");

            return CreatedAtAction("GetClub", new { id = createdClub.Id }, new ClubSimpleDto { Id = createdClub.Id, Name = createdClub.Name, Location = createdClub.Location });
        }

        // DELETE: api/Clubs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Club>> DeleteClub(int id)
        {
            var club = await _context.Clubs.FindAsync(id);
            if (club == null)
            {
                return NotFound();
            }

            _context.Clubs.Remove(club);
            await _context.SaveChangesAsync();

            return club;
        }

        private bool ClubExists(int id)
        {
            return _context.Clubs.Any(e => e.Id == id);
        }
    }
}
