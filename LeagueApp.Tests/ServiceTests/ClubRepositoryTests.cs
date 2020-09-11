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
    public class ClubRepositoryTests
    {

        private readonly LeagueAppContext _context;
        private readonly IClubRepository _clubRepository;

        public ClubRepositoryTests()
        {
            _context = new InMemoryDbContextFactory().GetDbContext();
            _clubRepository = new ClubRepository(_context, new SquadRepository(_context));
        }

        [SetUp]
        public void SetUp()
        {
            _context.Clubs.RemoveRange(_context.Clubs);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Clubs.RemoveRange(_context.Clubs);
            _context.SaveChanges();
        }

        [Test]
        public void CanAddClub()
        {

            Assert.DoesNotThrow(() =>
            {
                var club = new ClubCreationDto()
                {
                    Name = "Test club 1",
                    Location = "Countyshire"
                };

                _clubRepository.AddClub(club);
            });

        }

        [Test]
        public void CanGetClubThatHasBeenAdded()
        {

            var club = new ClubCreationDto()
            {
                Name = "Test club 1",
                Location = "Countyshire"
            };

            var addedClub = _clubRepository.AddClub(club);

            var clubFromDb = _clubRepository.GetClub(addedClub.Id);

            Assert.AreEqual(club.Name, clubFromDb.Name);

        }

        [Test]
        public void CanGetMultipleClubsThatHasBeenAdded()
        {

            var club = new ClubCreationDto()
            {
                Name = "Test club 1",
                Location = "Countyshire"
            };

            var addedClub = _clubRepository.AddClub(club);

            var club2 = new ClubCreationDto()
            {
                Name = "Test club 2",
                Location = "Countyshire"
            };

            var addedClub2 = _clubRepository.AddClub(club2);

            var club3 = new ClubCreationDto()
            {
                Name = "Test club 3",
                Location = "Countyshire"
            };

            var addedClub3 = _clubRepository.AddClub(club3);

            var clubsFromDb = _clubRepository.GetAllClubs();

            Assert.AreEqual(clubsFromDb.Count(), 3);
            Assert.AreEqual(clubsFromDb.Last().Name, club3.Name);
        }

        [Test]
        public void CanDeleteClub()
        {
            var club = new Club
            {
                Id = 1,
                Name = "Test Squad",
                Location = "Countyshire",
                Squads = new Collection<Squad>(),
                isDeleted = false
            };

            _context.Clubs.Add(club);
            _context.SaveChanges();

            _clubRepository.DeleteClub(club);
            var clubFromDb = _clubRepository.GetClub(club.Id);

            Assert.IsNull(clubFromDb);
        }

        [Test]
        public void CanUpdateClub()
        {
            var club = new Club
            {
                Id = 1,
                Name = "Test Squad",
                Location = "Countyshire",
                Squads = new Collection<Squad>(),
                isDeleted = false
            };

            _context.Clubs.Add(club);
            _context.SaveChanges();

            var newName = "Updated Test Squad";

            var updatedClub = new ClubUpdateDto
            {
                Id = 1,
                Name = newName,
                Location = "Countyshire"
            };

            _clubRepository.UpdateClub(updatedClub);

            var clubFromDb = _clubRepository.GetClub(club.Id);

            Assert.AreEqual(clubFromDb.Name, newName);
        }

        [Test]
        public void ClubIsValiatedWhenAddedAndExceptionsRetunedWhenErroneous()
        {

            var club = new ClubCreationDto()
            {
                Name = "Test club 1 has a really long name that should cause a validation error as it exceedes the length limit",
                Location = "Countyshire"
            };

            var exception = Assert.Throws<AppException>(() => _clubRepository.AddClub(club));
            Assert.That(exception.Message, Is.EqualTo(" Name can't be longer than 40 characters."));

        }

    }
}