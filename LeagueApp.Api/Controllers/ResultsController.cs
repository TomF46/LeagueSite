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
    public class ResultsController : ControllerBase
    {
        private readonly IResultRepository _resultRepository;
        private readonly IFixtureRepository _fixtureRepository;


        public ResultsController(IResultRepository resultRepository, IFixtureRepository fixtureRepository)
        {
            _resultRepository = resultRepository;
            _fixtureRepository = fixtureRepository;
        }


        // PUT: api/Results/5
        [HttpPut("{id}")]
        [Authorize]
        public IActionResult PutResult(Result result)
        {
            _resultRepository.UpdateResult(result);

            if (!_resultRepository.Save()) throw new Exception("Failed to update result");

            return Ok(result);

        }

        // POST: api/Results
        [HttpPost]
        [Authorize]
        public ActionResult<Result> PostResult(Result result)
        {

            var fixture = _resultRepository.AddResult(result);
            if (!_resultRepository.Save()) throw new Exception("Failed to create result");

            return CreatedAtAction("GetFixture", new { controller = "fixtures", id = fixture.Id }, fixture);
        }

        // DELETE: api/Results/5
        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult<Fixture> DeleteResult(int id)
        {
            var fixture = _fixtureRepository.GetFixture(id);
            if (fixture == null)
            {
                return NotFound();
            }

            _resultRepository.DeleteResult(fixture);
            if (!_resultRepository.Save()) throw new Exception("Failed to delete result");

            return fixture;
        }
    }
}
