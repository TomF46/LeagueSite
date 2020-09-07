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
    public class LeaguesController : ControllerBase
    {
        private readonly ILeagueRepository _leagueRepository;

        public LeaguesController(ILeagueRepository leagueRepository)
        {
            _leagueRepository = leagueRepository;
        }

        // GET: api/Leagues
        [HttpGet]
        public ActionResult<IEnumerable<LeagueSimpleDto>> GetLeagues()
        {
            var leagues = _leagueRepository.GetAllLeagues();
            var leaguesDto = leagues.Select(league => new LeagueSimpleDto
            {
                Id = league.Id,
                Name = league.Name,
                NumberOfParticipants = league.ParticipantSquads.Count
            });

            return Ok(leaguesDto);
        }

        // GET: api/Leagues/5
        [HttpGet("{id}")]
        public ActionResult<League> GetLeague(int id)
        {
            var league = _leagueRepository.GetLeague(id);

            if (league == null)
            {
                return NotFound();
            }

            return Ok(league);
        }

        // PUT: api/Leagues/5
        [HttpPut("{id}")]
        [Authorize]
        public IActionResult PutLeague(LeagueUpdateDto league)
        {
            var productToUpdate = _leagueRepository.GetLeague(league.Id);

            if (productToUpdate == null) return NotFound();

            try
            {

                _leagueRepository.UpdateLeague(league);

                if (!_leagueRepository.Save()) throw new Exception("Failed to update league");

                return Ok(league);
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        // POST: api/Leagues
        [HttpPost]
        [Authorize]
        public ActionResult<League> PostLeague(LeagueCreationDto league)
        {
            try
            {
                var createdLeague = _leagueRepository.AddLeague(league);
                if (!_leagueRepository.Save()) throw new Exception("Failed to create league");

                return CreatedAtAction("GetLeague", new { id = createdLeague.Id }, new LeagueSimpleDto { Id = createdLeague.Id, Name = createdLeague.Name, NumberOfParticipants = createdLeague.ParticipantSquads.Count });
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE: api/Leagues/5
        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult<League> DeleteLeague(int id)
        {
            var league = _leagueRepository.GetLeague(id);
            if (league == null)
            {
                return NotFound();
            }

            _leagueRepository.DeleteLeague(league);
            if (!_leagueRepository.Save()) throw new Exception("Failed to delete squad");

            return league;
        }

    }
}
