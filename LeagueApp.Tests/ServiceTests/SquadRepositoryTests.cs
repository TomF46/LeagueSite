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
                Name = "Test Club",
                Location = "Countyshire",
                isDeleted = false
            };
        }

        [SetUp]
        public void SetUp()
        {
            _context.Squads.RemoveRange(_context.Squads);
            _context.Clubs.RemoveRange(_context.Clubs);
            _context.SaveChanges();
            _context.Clubs.Add(_TestClub);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Squads.RemoveRange(_context.Squads);
            _context.Clubs.RemoveRange(_context.Clubs);
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
            _context.Squads.RemoveRange(_context.Squads);
            _context.SaveChanges();

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

            Assert.AreEqual(squad.Name, squadsFromDb.First().Name);
            Assert.AreEqual(2, squadsFromDb.Count());
        }

        [Test]
        public void CanDeleteSquad()
        {
            var squad = new SquadCreationDto()
            {
                Name = "Test squad 1",
                ClubId = _TestClub.Id
            };
            var addedSquad = _SquadRepository.AddSquad(squad);

            _SquadRepository.DeleteSquad(addedSquad);
            var squadFromDb = _SquadRepository.GetSquad(addedSquad.Id);

            Assert.IsNull(squadFromDb);
        }

        [Test]
        public void CanUpdateSquad()
        {
            var squad = new SquadCreationDto()
            {
                Name = "Test squad 1",
                ClubId = _TestClub.Id
            };
            var addedSquad = _SquadRepository.AddSquad(squad);


            var newName = "Updated Test Squad";

            var updatedSquad = new SquadUpdateDto
            {
                Id = addedSquad.Id,
                Name = newName
            };

            _SquadRepository.UpdateSquad(updatedSquad);

            var squadFromDb = _SquadRepository.GetSquad(addedSquad.Id);

            Assert.AreEqual(newName, squadFromDb.Name);
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