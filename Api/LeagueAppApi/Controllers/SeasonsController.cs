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
                LeagueName = season.League.Name
            });

            return Ok(seasonsDto);
        }

        // GET: api/Seasons/5
        [HttpGet("{id}")]
        public ActionResult<Season> GetSeason(int id)
        {
            var season = _seasonRepository.GetSeason(id);

            if (season == null)
            {
                return NotFound();
            }

            return Ok(season);
        }

        // PUT: api/Seasons/5
        [HttpPut("{id}")]
        public IActionResult PutSeason(SeasonUpdateDto season)
        {
            var productToUpdate = _seasonRepository.GetSeason(season.Id);

            if (productToUpdate == null) return NotFound();

            _seasonRepository.UpdateSeason(season);

            if (!_seasonRepository.Save()) throw new Exception("Failed to update season");

            return Ok(season);

        }

        // POST: api/Seasons
        [HttpPost]
        public ActionResult<Season> PostSeason(SeasonCreationDto season)
        {

            var createdSeason = _seasonRepository.AddSeason(season);
            if (!_seasonRepository.Save()) throw new Exception("Failed to create season");

            return CreatedAtAction("GetSeason", new { id = createdSeason.Id }, new SeasonSimpleDto { Id = createdSeason.Id, Name = createdSeason.Name, Active = createdSeason.Active, LeagueName = createdSeason.League.Name });
        }

        // DELETE: api/Seasons/5
        [HttpDelete("{id}")]
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
