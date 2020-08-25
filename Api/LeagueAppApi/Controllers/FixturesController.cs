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
    public class FixturesController : ControllerBase
    {
        private readonly IFixtureRepository _fixtureRepository;

        public FixturesController(IFixtureRepository fixtureRepository)
        {
            _fixtureRepository = fixtureRepository;
        }

        // GET: api/Fixtures
        [HttpGet]
        public ActionResult<IEnumerable<FixtureSimpleDto>> GetFixtures()
        {
            var fixtures = _fixtureRepository.GetAllFixtures();
            var fixturesDto = fixtures.Select(fixture => new FixtureSimpleDto
            {
                Id = fixture.Id,
                Date = fixture.Date,
                SeasonId = fixture.Season.Id,
                HomeTeamId = fixture.HomeTeam.Id,
                HomeTeamName = fixture.HomeTeam.Name,
                HomeScore = fixture.HomeScore,
                AwayTeamId = fixture.AwayTeam.Id,
                AwayTeamName = fixture.AwayTeam.Name,
                AwayScore = fixture.AwayScore,
                Complete = fixture.Complete
            });

            return Ok(fixturesDto);
        }

        // GET: api/Fixtures/5
        [HttpGet("{id}")]
        public ActionResult<Fixture> GetFixture(int id)
        {
            var fixture = _fixtureRepository.GetFixture(id);

            if (fixture == null)
            {
                return NotFound();
            }

            return Ok(fixture);
        }

        // PUT: api/Fixtures/5
        [HttpPut("{id}")]
        public IActionResult PutFixture(FixtureUpdateDto fixture)
        {
            var productToUpdate = _fixtureRepository.GetFixture(fixture.Id);

            if (productToUpdate == null) return NotFound();

            _fixtureRepository.UpdateFixture(fixture);

            if (!_fixtureRepository.Save()) throw new Exception("Failed to update fixture");

            return Ok(fixture);

        }

        // POST: api/Fixtures
        [HttpPost]
        public ActionResult<Fixture> PostFixture(FixtureCreationDto fixture)
        {

            var createdFixture = _fixtureRepository.AddFixture(fixture);
            if (!_fixtureRepository.Save()) throw new Exception("Failed to create fixture");

            return CreatedAtAction("GetFixture", new { id = createdFixture.Id },
            new FixtureSimpleDto
            {
                Date = fixture.Date,
                SeasonId = createdFixture.Season.Id,
                HomeTeamId = createdFixture.HomeTeam.Id,
                HomeTeamName = createdFixture.HomeTeam.Name,
                HomeScore = createdFixture.HomeScore,
                AwayTeamId = createdFixture.AwayTeam.Id,
                AwayTeamName = createdFixture.AwayTeam.Name,
                AwayScore = createdFixture.AwayScore,
                Complete = createdFixture.Complete
            });
        }

        // DELETE: api/Fixtures/5
        [HttpDelete("{id}")]
        public ActionResult<Fixture> DeleteFixture(int id)
        {
            var fixture = _fixtureRepository.GetFixture(id);
            if (fixture == null)
            {
                return NotFound();
            }

            _fixtureRepository.DeleteFixture(fixture);
            if (!_fixtureRepository.Save()) throw new Exception("Failed to delete fixture");

            return fixture;
        }
    }
}
