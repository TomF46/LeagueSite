using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeagueAppApi.Models;
using LeagueAppApi.Services;
using Microsoft.AspNetCore.Authorization;

namespace LeagueAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClubsController : ControllerBase
    {
        private readonly IClubRepository _clubRepository;

        public ClubsController(IClubRepository clubRepository)
        {
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
        [HttpPut("{id}")]
        [Authorize]
        public IActionResult PutClub(ClubUpdateDto club)
        {
            var productToUpdate = _clubRepository.GetClub(club.Id);

            if (productToUpdate == null) return NotFound();

            try
            {
                _clubRepository.UpdateClub(club);

                if (!_clubRepository.Save()) throw new Exception("Failed to update club");

                return Ok(club);
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        // POST: api/Clubs
        [HttpPost]
        [Authorize]
        public ActionResult<Club> PostClub(ClubCreationDto club)
        {
            try
            {
                var createdClub = _clubRepository.AddClub(club);
                if (!_clubRepository.Save()) throw new Exception("Failed to create club");

                return CreatedAtAction("GetClub", new { id = createdClub.Id }, new ClubSimpleDto { Id = createdClub.Id, Name = createdClub.Name, Location = createdClub.Location });
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        // DELETE: api/Clubs/5
        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult<Club> DeleteClub(int id)
        {
            var club = _clubRepository.GetClub(id);
            if (club == null)
            {
                return NotFound();
            }

            _clubRepository.DeleteClub(club);
            if (!_clubRepository.Save()) throw new Exception("Failed to delete squad");

            return club;
        }
    }
}
