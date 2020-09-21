using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeagueApp.Api.Models;
using LeagueApp.Api.Services;
using Microsoft.AspNetCore.Authorization;

namespace LeagueApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeasonsController : ControllerBase
    {
        private readonly ISeasonRepository _seasonRepository;
        private readonly IStatsService _statsService;

        public SeasonsController(ISeasonRepository seasonRepository, IStatsService statsService)
        {
            _seasonRepository = seasonRepository;
            _statsService = statsService;
        }

        // GET: api/Seasons
        [HttpGet]
        public ActionResult<IEnumerable<SeasonSimpleDto>> GetSeasons()
        {
            var seasons = _seasonRepository.GetAllSeasons();
            var seasonsDto = seasons.Select(season => new SeasonSimpleDto
            {
                Id = season.Id,
                Name = season.Name,
                Active = season.Active,
                LeagueId = season.League.Id,
                LeagueName = season.League.Name
            });

            return Ok(seasonsDto);
        }

        // GET: api/Seasons/5
        [HttpGet("{id}")]
        public ActionResult<SeasonDetailDto> GetSeason(int id)
        {
            var season = _seasonRepository.GetSeason(id);

            if (season == null)
            {
                return NotFound();
            }

            var dto = new SeasonDetailDto
            {
                Id = season.Id,
                Name = season.Name,
                LeagueName = season.League.Name,
                LeagueId = season.League.Id,
                Active = season.Active,
                Fixtures = GroupFixtures(season)
            };


            return Ok(dto);
        }

        private ICollection<FixtureDate> GroupFixtures(Season season)
        {
            return season.Fixtures.GroupBy(fixture => fixture.Date.Value.Date)
            .Select(group => new FixtureDate
            {
                Date = group.Key,
                Fixtures = group.Select(fixture => new FixtureSimpleDto
                {
                    Id = fixture.Id,
                    Date = fixture.Date,
                    SeasonId = fixture.Season.Id,
                    Complete = fixture.Complete,
                    HomeTeamId = fixture.HomeTeam.Id,
                    HomeTeamName = fixture.HomeTeam.DisplayName,
                    HomeScore = fixture.HomeScore,
                    AwayTeamId = fixture.AwayTeam.Id,
                    AwayTeamName = fixture.AwayTeam.DisplayName,
                    AwayScore = fixture.AwayScore
                }).ToList()
            }).OrderBy(x => x.Date).ToList();
        }

        [HttpGet("{id}/stats")]
        public ActionResult<SeasonDetailDto> GetSeasonStats(int id)
        {

            var league = _seasonRepository.GetSeason(id);

            if (league == null)
            {
                return NotFound();
            }

            try
            {
                var stats = _statsService.GetStats(id);
                return Ok(stats);
            }
            catch (AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Seasons/5
        [HttpPut("{id}")]
        [Authorize]
        public IActionResult PutSeason(SeasonUpdateDto season)
        {
            var productToUpdate = _seasonRepository.GetSeason(season.Id);

            if (productToUpdate == null) return NotFound();

            try
            {
                _seasonRepository.UpdateSeason(season);

                if (!_seasonRepository.Save()) throw new Exception("Failed to update season");

                return Ok(season);
            }
            catch (AppException ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // POST: api/Seasons
        [HttpPost]
        [Authorize]
        public ActionResult<Season> PostSeason(SeasonCreationDto season)
        {
            try
            {
                var createdSeason = _seasonRepository.AddSeason(season);
                if (!_seasonRepository.Save()) throw new Exception("Failed to create season");

                return CreatedAtAction("GetSeason", new { id = createdSeason.Id }, new SeasonSimpleDto { Id = createdSeason.Id, Name = createdSeason.Name, Active = createdSeason.Active, LeagueId = createdSeason.League.Id, LeagueName = createdSeason.League.Name });
            }
            catch (AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Seasons/5
        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult<Season> DeleteSeason(int id)
        {
            var season = _seasonRepository.GetSeason(id);
            if (season == null)
            {
                return NotFound();
            }

            _seasonRepository.DeleteSeason(season);
            if (!_seasonRepository.Save()) throw new Exception("Failed to delete season");

            return season;
        }
    }
}
