using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeagueApp.Api.Models;
using LeagueApp.Api.Services;
using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Authorization;

namespace LeagueApp.Api.Controllers
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
        public ActionResult<FixtureSimpleDto> GetFixture(int id)
        {
            var fixture = _fixtureRepository.GetFixture(id);

            if (fixture == null)
            {
                return NotFound();
            }

            var dto = new FixtureSimpleDto
            {
                Id = fixture.Id,
                Date = fixture.Date,
                SeasonId = fixture.Season.Id,
                HomeTeamId = fixture.HomeTeam.Id,
                HomeTeamName = fixture.HomeTeam.DisplayName,
                HomeScore = fixture.HomeScore,
                HomeGoalScorers = GetGoalScorers(fixture.Goals, SideEnum.Home),
                AwayTeamId = fixture.AwayTeam.Id,
                AwayTeamName = fixture.AwayTeam.DisplayName,
                AwayScore = fixture.AwayScore,
                AwayGoalScorers = GetGoalScorers(fixture.Goals, SideEnum.Away),

                Complete = fixture.Complete
            };

            return Ok(dto);
        }

        private ICollection<FixtureScorerDto> GetGoalScorers(ICollection<GoalRecord> goals, SideEnum side)
        {
            var goalsDto = goals.Where(g => g.Side == side).Select(g => new FixtureScorerDto
            {
                PlayerId = g.Player.Id,
                PlayerDisplayName = g.Player.DisplayName
            }).ToList();

            return goalsDto;
        }

        // PUT: api/Fixtures/5
        [HttpPut("{id}")]
        [Authorize]
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
        [Authorize]
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
        [Authorize]
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
