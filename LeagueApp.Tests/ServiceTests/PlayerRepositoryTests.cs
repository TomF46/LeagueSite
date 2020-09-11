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
                Id = 1,
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
            _context.Squads.RemoveRange(_context.Squads);
            _context.Clubs.RemoveRange(_context.Clubs);
            _context.SaveChanges();
            _context.Clubs.Add(_TestClub);
            _context.Squads.Add(_TestSquad);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Players.RemoveRange(_context.Players);
            _context.Squads.RemoveRange(_context.Squads);
            _context.Clubs.RemoveRange(_context.Clubs);
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
            _context.Players.RemoveRange(_context.Players);
            _context.SaveChanges();

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

        // [Test]
        // public void CanDeletePlayer()
        // {
        //     var player = new PlayerCreationDto()
        //     {
        //         FirstName = "Test",
        //         LastName = "Player",
        //         Position = "Forward",
        //         ClubId = _TestClub.Id,
        //         SquadId = _TestSquad.Id
        //     };

        //     var deletedPlayer = _PlayerRepository.AddPlayer(player);

        //     _PlayerRepository.DeletePlayer(deletedPlayer);
        //     var playerFromDb = _PlayerRepository.GetPlayer(deletedPlayer.Id);

        //     Assert.IsNull(playerFromDb);
        // }

        // [Test]
        // public void CanUpdatePlayer()
        // {
        //     var player = new PlayerCreationDto()
        //     {
        //         FirstName = "Test",
        //         LastName = "Player",
        //         Position = "Forward",
        //         ClubId = _TestClub.Id,
        //         SquadId = _TestSquad.Id
        //     };

        //     var savedPlayer = _PlayerRepository.AddPlayer(player);

        //     var newFirstname = "Updated Test";

        //     var updatedPlayer = new PlayerUpdateDto
        //     {
        //         Id = savedPlayer.Id,
        //         FirstName = newFirstname,
        //         LastName = "Player",
        //         Position = "Midfield"
        //     };

        //     _PlayerRepository.UpdatePlayer(updatedPlayer);

        //     var playerFromDb = _PlayerRepository.GetPlayer(savedPlayer.Id);

        //     Assert.AreEqual(playerFromDb.FirstName, newFirstname);
        // }

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