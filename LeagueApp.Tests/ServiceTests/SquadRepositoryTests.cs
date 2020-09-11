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
    public class SquadRepositoryTests
    {

        private readonly LeagueAppContext _context;
        private readonly ISquadRepository _SquadRepository;
        private readonly Club _TestClub;

        public SquadRepositoryTests()
        {
            _context = new InMemoryDbContextFactory().GetDbContext();
            _SquadRepository = new SquadRepository(_context);

            _TestClub = new Club
            {
                Id = 1,
                Name = "Test Squad",
                Location = "Countyshire",
                Squads = new Collection<Squad>(),
                isDeleted = false
            };
        }

        [SetUp]
        public void SetUp()
        {
            _context.Squads.RemoveRange(_context.Squads);
            // AddTestClub();
            var testClub = _context.Clubs.FirstOrDefault(x => x.Id == _TestClub.Id);
            if (testClub == null) _context.Clubs.Add(_TestClub);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Squads.RemoveRange(_context.Squads);
            _context.SaveChanges();
        }

        [Test]
        public void CanAddSquad()
        {
            Assert.DoesNotThrow(() =>
            {
                var squad = new SquadCreationDto()
                {
                    Name = "Test squad 1",
                    ClubId = _TestClub.Id
                };
                _SquadRepository.AddSquad(squad);
            });
        }

        [Test]
        public void CanGetSquadThatHasBeenAdded()
        {
            var squad = new SquadCreationDto()
            {
                Name = "Test squad 1",
                ClubId = _TestClub.Id
            };
            var addedSquad = _SquadRepository.AddSquad(squad);

            var squadFromDb = _SquadRepository.GetSquad(addedSquad.Id);

            Assert.AreEqual(squad.Name, squadFromDb.Name);
        }

        [Test]
        public void CanGetMultipleSquadsThatHasBeenAdded()
        {
            var squad = new SquadCreationDto()
            {
                Name = "Test squad 1",
                ClubId = _TestClub.Id
            };
            var addedSquad = _SquadRepository.AddSquad(squad);

            var squad2 = new SquadCreationDto()
            {
                Name = "Test squad 2",
                ClubId = _TestClub.Id
            };
            var addedSquad2 = _SquadRepository.AddSquad(squad2);

            var squadsFromDb = _SquadRepository.GetAllSquads();

            Assert.AreEqual(squadsFromDb.Count(), 2);
        }

        [Test]
        public void CanDeleteSquad()
        {
            var squad = new Squad
            {
                Id = 1,
                Name = "Test squad 1",
                Club = _TestClub,
                isDeleted = false,
                Players = new Collection<Player>(),
                League = null,
            };

            _context.Squads.Add(squad);
            _context.SaveChanges();

            _SquadRepository.DeleteSquad(squad);
            var squadFromDb = _SquadRepository.GetSquad(squad.Id);

            Assert.IsNull(squadFromDb);
        }

        [Test]
        public void CanUpdateSquad()
        {
            var squad = new Squad
            {
                Id = 1,
                Name = "Test squad 1",
                Club = _TestClub,
                isDeleted = false,
                Players = new Collection<Player>(),
                League = null,
            };

            _context.Squads.Add(squad);
            _context.SaveChanges();

            var newName = "Updated Test Squad";

            var updatedSquad = new SquadUpdateDto
            {
                Id = 1,
                Name = newName
            };

            _SquadRepository.UpdateSquad(updatedSquad);

            var squadFromDb = _SquadRepository.GetSquad(squad.Id);

            Assert.AreEqual(squadFromDb.Name, newName);
        }

        [Test]
        public void SquadIsValidationOnCreationAndExceptionIsReturnedWhenErroneous()
        {
            var squad = new SquadCreationDto()
            {
                Name = "Test squad 1 has a long name that should cause a validation error",
                ClubId = _TestClub.Id
            };

            var exception = Assert.Throws<AppException>(() => _SquadRepository.AddSquad(squad));
            Assert.That(exception.Message, Is.EqualTo(" Name cannot be longer than 40 characters."));
        }
    }
}