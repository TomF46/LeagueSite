using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeagueApp.Api.Models;
using LeagueApp.Api.Services;

namespace LeagueApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeagueTableController : ControllerBase
    {
        private readonly ISeasonRepository _seasonRepository;
        private readonly ILeagueTableService _leagueTableService;

        public LeagueTableController(ISeasonRepository seasonRepository, ILeagueTableService leagueTableService)
        {
            _seasonRepository = seasonRepository;
            _leagueTableService = leagueTableService;
        }

        // GET: api/Leagues/5
        [HttpGet("{id}")]
        public ActionResult<LeagueTableDto> GetLeagueTable(int id)
        {
            var league = _seasonRepository.GetSeason(id);

            if (league == null)
            {
                return NotFound();
            }

            var table = _leagueTableService.GenerateTable(league);

            return Ok(table);
        }
    }
}
