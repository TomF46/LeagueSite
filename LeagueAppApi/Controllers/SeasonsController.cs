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
    public class SeasonsController : ControllerBase
    {
        private readonly ISeasonRepository _seasonRepository;

        public SeasonsController(ISeasonRepository seasonRepository)
        {
            _seasonRepository = seasonRepository;
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
                Fixtures = season.Fixtures.Select(fixture => new FixtureSimpleDto
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
            };

            return Ok(dto);
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
                return BadRequest(new { message = ex.Message });
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
                return BadRequest(new { message = ex.Message });
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
