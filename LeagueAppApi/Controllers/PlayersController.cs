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
    public class PlayersController : ControllerBase
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayersController(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        // GET: api/Players
        [HttpGet]
        public ActionResult<IEnumerable<PlayerSimpleDto>> GetPlayers()
        {
            var players = _playerRepository.GetAllPlayers();
            var playersDto = players.Select(player => new PlayerSimpleDto
            {
                Id = player.Id,
                FirstName = player.FirstName,
                LastName = player.LastName,
                DisplayName = player.DisplayName,
                Position = player.Position,
                ClubId = player.Club.Id,
                ClubName = player.Club.Name,
                SquadId = player.Squad.Id,
                SquadName = player.Squad.Name
            });


            return Ok(playersDto);
        }

        // GET: api/Players/5
        [HttpGet("{id}")]
        public ActionResult<Player> GetPlayer(int id)
        {
            var player = _playerRepository.GetPlayer(id);

            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        // PUT: api/Players/5
        [HttpPut("{id}")]
        public IActionResult PutPlayer(PlayerUpdateDto player)
        {
            var playerToUpdate = _playerRepository.GetPlayer(player.Id);

            if (playerToUpdate == null) return NotFound();

            _playerRepository.UpdatePlayer(player);

            if (!_playerRepository.Save()) throw new Exception("Failed to update player");

            return Ok(player);

        }

        // POST: api/Players
        [HttpPost]
        public ActionResult<Player> PostPlayer(PlayerCreationDto player)
        {
            var savedObject = _playerRepository.AddPlayer(player);
            if (!_playerRepository.Save()) throw new Exception("Failed to create player");

            return CreatedAtAction("GetPlayer", new { id = savedObject.Id }, new PlayerSimpleDto
            {
                Id = savedObject.Id,
                FirstName = savedObject.FirstName,
                LastName = savedObject.LastName,
                DisplayName = savedObject.DisplayName,
                Position = savedObject.Position,
                ClubId = savedObject.Club.Id,
                ClubName = savedObject.Club.Name,
                SquadId = savedObject.Squad.Id,
                SquadName = savedObject.Squad.Name
            });
        }

        // DELETE: api/Players/5
        [HttpDelete("{id}")]
        public ActionResult<Player> DeletePlayer(int id)
        {
            var player = _playerRepository.GetPlayer(id);
            if (player == null)
            {
                return NotFound();
            }

            _playerRepository.DeletePlayer(player);
            if (!_playerRepository.Save()) throw new Exception("Failed to delete player");

            return player;
        }
    }
}