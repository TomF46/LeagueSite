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
    public class TransferRepositoryTests
    {

        private readonly LeagueAppContext _context;
        private readonly ITransferRepository _TransferRepository;
        private readonly Club _TestClub;
        private readonly Squad _TestSquad;
        private readonly Squad _TestSquad2;
        private readonly Player _TestPlayer;



        public TransferRepositoryTests()
        {
            _context = new InMemoryDbContextFactory().GetDbContext();
            _TransferRepository = new TransferRepository(_context);

            _TestClub = new Club
            {
                Id = 1,
                Name = "Test Club",
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

            _TestSquad2 = new Squad
            {
                Id = 2,
                Name = "Test squad 2",
                Club = _TestClub,
                isDeleted = false,
                Players = new Collection<Player>(),
                League = null,
            };

            _TestPlayer = new Player
            {
                Id = 1,
                FirstName = "Test",
                LastName = "Player",
                Position = "Defender",
                Club = _TestClub,
                Squad = _TestSquad,
                Goals = new Collection<GoalRecord>(),
                isDeleted = false,
            };
        }

        [SetUp]
        public void SetUp()
        {
            _context.Transfers.RemoveRange(_context.Transfers);
            _context.Players.RemoveRange(_context.Players);
            _context.Squads.RemoveRange(_context.Squads);
            _context.Clubs.RemoveRange(_context.Clubs);
            _context.SaveChanges();
            _context.Clubs.Add(_TestClub);
            _context.Squads.Add(_TestSquad);
            _context.Squads.Add(_TestSquad2);
            _context.Players.Add(_TestPlayer);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Transfers.RemoveRange(_context.Transfers);
            _context.Players.RemoveRange(_context.Players);
            _context.Squads.RemoveRange(_context.Squads);
            _context.Clubs.RemoveRange(_context.Clubs);
            _context.SaveChanges();
        }

        [Test]
        public void CanAddTransfer()
        {
            Assert.DoesNotThrow(() =>
            {
                var transfer = new TransferCreationDto
                {
                    PlayerId = _TestPlayer.Id,
                    FromSquadId = _TestSquad.Id,
                    ToSquadId = _TestSquad2.Id
                };
                _TransferRepository.AddTransfer(transfer);
            });
        }

        [Test]
        public void CanGetAddedTransfer()
        {
            var transfer = new TransferCreationDto
            {
                PlayerId = _TestPlayer.Id,
                FromSquadId = _TestSquad.Id,
                ToSquadId = _TestSquad2.Id
            };
            var addedTransfer = _TransferRepository.AddTransfer(transfer);

            var transferFromDb = _TransferRepository.GetTransfer(addedTransfer.Id);

            Assert.AreEqual(transfer.PlayerId, transferFromDb.Player.Id);
        }

        [Test]
        public void CanGetMultipleAddedTransfer()
        {
            var transfer = new TransferCreationDto
            {
                PlayerId = _TestPlayer.Id,
                FromSquadId = _TestSquad.Id,
                ToSquadId = _TestSquad2.Id
            };
            var addedTransfer = _TransferRepository.AddTransfer(transfer);

            var transfer2 = new TransferCreationDto
            {
                PlayerId = _TestPlayer.Id,
                FromSquadId = _TestSquad2.Id,
                ToSquadId = _TestSquad.Id
            };
            var addedTransfer2 = _TransferRepository.AddTransfer(transfer2);

            var transfersFromDb = _TransferRepository.GetAllTransfers();

            Assert.AreEqual(2, transfersFromDb.Count());
        }

        [Test]
        public void ThrowsExceptionIfPlayerDoesntExist()
        {
            var transfer = new TransferCreationDto
            {
                PlayerId = 9999,
                FromSquadId = _TestSquad.Id,
                ToSquadId = _TestSquad2.Id
            };
            var exception = Assert.Throws<AppException>(() => _TransferRepository.AddTransfer(transfer));
            Assert.That(exception.Message, Is.EqualTo("Player  does not exist"));
        }

        [Test]
        public void ThrowsExceptionIfFromTeamDoesntExist()
        {
            var transfer = new TransferCreationDto
            {
                PlayerId = _TestPlayer.Id,
                FromSquadId = 999999,
                ToSquadId = _TestSquad2.Id
            };
            var exception = Assert.Throws<AppException>(() => _TransferRepository.AddTransfer(transfer));
            Assert.That(exception.Message, Is.EqualTo("From Squad does not exist"));
        }


        [Test]
        public void ThrowsExceptionIfToTeamDoesntExist()
        {
            var transfer = new TransferCreationDto
            {
                PlayerId = _TestPlayer.Id,
                FromSquadId = _TestSquad.Id,
                ToSquadId = 999999
            };
            var exception = Assert.Throws<AppException>(() => _TransferRepository.AddTransfer(transfer));
            Assert.That(exception.Message, Is.EqualTo("To Squad does not exist"));
        }
    }
}