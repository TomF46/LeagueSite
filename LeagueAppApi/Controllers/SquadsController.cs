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
    public class SquadsController : ControllerBase
    {
        private readonly ISquadRepository _squadRepository;

        public SquadsController(ISquadRepository squadRepository)
        {
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
                ClubId = squad.Club.Id,
                ClubName = squad.Club.Name,
                LeagueId = squad.League == null ? (int?)null : squad.League.Id,
                LeagueName = squad.League == null ? null : squad.League.Name

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
        [HttpPut("{id}")]
        [Authorize]
        public IActionResult PutSquad(SquadUpdateDto squad)
        {
            var squadToUpdate = _squadRepository.GetSquad(squad.Id);

            if (squadToUpdate == null) return NotFound();

            try
            {
                _squadRepository.UpdateSquad(squad);

                if (!_squadRepository.Save()) throw new Exception("Failed to update squad");

                return Ok(squad);
            }
            catch (AppException ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // POST: api/Squads
        [HttpPost]
        [Authorize]
        public ActionResult<Squad> PostSquad(SquadCreationDto squad)
        {
            try
            {
                var savedObject = _squadRepository.AddSquad(squad);
                if (!_squadRepository.Save()) throw new Exception("Failed to create squad");

                return CreatedAtAction("GetSquad", new { id = savedObject.Id },
                new SquadSimpleDto
                {
                    Id = savedObject.Id,
                    Name = savedObject.Name,
                    ClubId = savedObject.Club.Id,
                    ClubName = savedObject.Club.Name,
                    LeagueId = savedObject.League == null ? (int?)null : savedObject.League.Id,
                    LeagueName = savedObject.League == null ? null : savedObject.League.Name
                });
            }
            catch (AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Squads/5
        [HttpDelete("{id}")]
        [Authorize]
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

        // POST: api/Leagues
        [HttpPost]
        [Route("AddToLeague")]
        [Authorize]
        public ActionResult<Squad> AddToLeague(AddToLeagueDto relation)
        {
            try
            {
                var addedSquad = _squadRepository.AddToLeague(relation);
                if (!_squadRepository.Save()) throw new Exception("Failed to add to league");

                return addedSquad;
            }
            catch (AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Leagues
        [HttpDelete]
        [Route("removeFromLeague")]
        [Authorize]
        public ActionResult<Squad> RemoveFromLeague(RemoveFromLeagueDto relation)
        {
            try
            {
                var removedSquad = _squadRepository.RemoveFromLeague(relation);
                if (!_squadRepository.Save()) throw new Exception("Failed to remove from league");

                return removedSquad;
            }
            catch (AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
