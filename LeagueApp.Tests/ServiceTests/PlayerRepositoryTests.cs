using NUnit.Framework;
using LeagueApp.Api.Models;
using LeagueApp.Api.Services;
using LeagueApp.Tests;
using System;
using LeagueApp.Api;
using System.Collections.ObjectModel;
using System.Linq;

namespace Tests
{
    [TestFixture]
    public class PlayerRepositoryTests
    {

        private readonly LeagueAppContext _context;
        private readonly IPlayerRepository _PlayerRepository;
        private readonly Club _TestClub;
        private readonly Squad _TestSquad;


        public PlayerRepositoryTests()
        {
            _context = new InMemoryDbContextFactory().GetDbContext();
            _PlayerRepository = new PlayerRepository(_context);

            _TestClub = new Club
            {
                Id = 2,
                Name = "Test Squad",
                Location = "Countyshire",
                Squads = new Collection<Squad>(),
                isDeleted = false
            };
            _TestSquad = new Squad
            {
                Id = 1,
                Name = "Test squad 1",
                Club = _TestClub,
                isDeleted = false,
                Players = new Collection<Player>(),
                League = null,
            };
        }

        [SetUp]
        public void SetUp()
        {
            _context.Players.RemoveRange(_context.Players);
            var testClub = _context.Clubs.FirstOrDefault(x => x.Id == _TestClub.Id);
            if (testClub == null) _context.Clubs.Add(_TestClub);
            var testSquad = _context.Squads.FirstOrDefault(x => x.Id == _TestSquad.Id);
            if (testSquad == null) _context.Squads.Add(_TestSquad);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Players.RemoveRange(_context.Players);
            _context.SaveChanges();
        }

        [Test]
        public void CanAddPlayer()
        {
            Assert.DoesNotThrow(() =>
            {
                var player = new PlayerCreationDto()
                {
                    FirstName = "Test",
                    LastName = "Player",
                    Position = "Forward",
                    ClubId = _TestClub.Id,
                    SquadId = _TestSquad.Id
                };

                _PlayerRepository.AddPlayer(player);
            });
        }

        [Test]
        public void CanGetPlayerThatHasBeenAdded()
        {
            var player = new PlayerCreationDto()
            {
                FirstName = "Test",
                LastName = "Player",
                Position = "Forward",
                ClubId = _TestClub.Id,
                SquadId = _TestSquad.Id
            };

            var addedPlayer = _PlayerRepository.AddPlayer(player);
            var playerFromDb = _PlayerRepository.GetPlayer(addedPlayer.Id);

            Assert.AreEqual(player.FirstName, playerFromDb.FirstName);
        }

        [Test]
        public void CanGetMultipleClubsThatHaveBeenAdded()
        {
            var player = new PlayerCreationDto()
            {
                FirstName = "Test",
                LastName = "Player",
                Position = "Forward",
                ClubId = _TestClub.Id,
                SquadId = _TestSquad.Id
            };

            var addedPlayer = _PlayerRepository.AddPlayer(player);

            var player2 = new PlayerCreationDto()
            {
                FirstName = "Test",
                LastName = "Player2",
                Position = "Defence",
                ClubId = _TestClub.Id,
                SquadId = _TestSquad.Id
            };

            var addedPlayer2 = _PlayerRepository.AddPlayer(player2);
            var playersFromDb = _PlayerRepository.GetAllPlayers();

            Assert.AreEqual(playersFromDb.Count(), 2);
        }

        [Test]
        public void CanDeletePlayer()
        {
            var player = new Player
            {
                Id = 1,
                FirstName = "Test",
                LastName = "Player",
                Position = "Midfield",
                Goals = new Collection<GoalRecord>(),
                Club = _TestClub,
                Squad = _TestSquad,
                isDeleted = false
            };

            _context.Players.Add(player);
            _context.SaveChanges();

            _PlayerRepository.DeletePlayer(player);
            var playerFromDb = _PlayerRepository.GetPlayer(player.Id);

            Assert.IsNull(playerFromDb);
        }

        [Test]
        public void CanUpdatePlayer()
        {
            var player = new Player
            {
                Id = 1,
                FirstName = "Test",
                LastName = "Player",
                Position = "Midfield",
                Goals = new Collection<GoalRecord>(),
                Club = _TestClub,
                Squad = _TestSquad,
                isDeleted = false
            };

            _context.Players.Add(player);
            _context.SaveChanges();

            var newFirstname = "Updated Test";

            var updatedPlayer = new PlayerUpdateDto
            {
                Id = 1,
                FirstName = newFirstname,
                LastName = "Player",
                Position = "Midfield"
            };

            _PlayerRepository.UpdatePlayer(updatedPlayer);

            var playerFromDb = _PlayerRepository.GetPlayer(player.Id);

            Assert.AreEqual(playerFromDb.FirstName, newFirstname);
        }

        [Test]
        public void PlayerIsValdatedOnCreationAndExceptionIsReturnedWhenErroneous()
        {
            var player = new PlayerCreationDto()
            {
                FirstName = "Test player has a really long name that should cause a validation error",
                LastName = "Player",
                Position = "Midfield",
                ClubId = _TestClub.Id,
                SquadId = _TestSquad.Id
            };

            var exception = Assert.Throws<AppException>(() => _PlayerRepository.AddPlayer(player));
            Assert.That(exception.Message, Is.EqualTo(" First name can't be longer than 40 characters."));
        }
    }
}