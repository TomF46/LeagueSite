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
    public class FixtureRepositoryTests
    {

        private readonly LeagueAppContext _context;
        private readonly IFixtureRepository _fixtureRepository;
        private readonly League _TestLeague;
        private readonly Season _TestSeason;
        private readonly Club _TestClub;

        private readonly Squad _Participant1;
        private readonly Squad _Participant2;


        public FixtureRepositoryTests()
        {
            _context = new InMemoryDbContextFactory().GetDbContext();
            _fixtureRepository = new FixtureRepository(_context);

            _TestClub = new Club
            {
                Id = 1,
                Name = "Test Club",
                Location = "Countyshire",
                Squads = new Collection<Squad>(),
                isDeleted = false
            };

            _Participant1 = new Squad
            {
                Id = 1,
                Name = "Test squad 1",
                Club = _TestClub,
                isDeleted = false,
                Players = new Collection<Player>(),
                League = null,
            };

            _Participant2 = new Squad
            {
                Id = 2,
                Name = "Test squad 2",
                Club = _TestClub,
                isDeleted = false,
                Players = new Collection<Player>(),
                League = null,
            };

            _TestLeague = new League
            {
                Id = 1,
                Name = "Test League",
                ParticipantSquads = new Collection<Squad>{
                    _Participant1,
                    _Participant2
                },
                Seasons = new Collection<Season>(),
                isDeleted = false
            };

            _TestSeason = new Season
            {
                Id = 1,
                Name = "Test season",
                League = _TestLeague,
                Fixtures = new Collection<Fixture>(),
                Active = true,
                isDeleted = false
            };
        }

        [SetUp]
        public void SetUp()
        {
            _context.Squads.RemoveRange(_context.Squads);
            _context.Clubs.RemoveRange(_context.Clubs);
            _context.Seasons.RemoveRange(_context.Seasons);
            _context.Leagues.RemoveRange(_context.Leagues);
            _context.Fixtures.RemoveRange(_context.Fixtures);
            _context.SaveChanges();
            _context.Clubs.Add(_TestClub);
            _context.Squads.Add(_Participant1);
            _context.Squads.Add(_Participant2);
            _context.Leagues.Add(_TestLeague);
            _context.Seasons.Add(_TestSeason);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Squads.RemoveRange(_context.Squads);
            _context.Clubs.RemoveRange(_context.Clubs);
            _context.Seasons.RemoveRange(_context.Seasons);
            _context.Leagues.RemoveRange(_context.Leagues);
            _context.Fixtures.RemoveRange(_context.Fixtures);
            _context.SaveChanges();
        }

        [Test]
        public void CanAddFixture()
        {

            Assert.DoesNotThrow(() =>
            {
                var fixture = new FixtureCreationDto()
                {
                    Date = DateTime.Now,
                    SeasonId = _TestSeason.Id,
                    HomeTeamId = _Participant1.Id,
                    AwayTeamId = _Participant2.Id
                };

                _fixtureRepository.AddFixture(fixture);
            });

        }

        [Test]
        public void CanGetFixtureThatHasBeenAdded()
        {

            var fixture = new FixtureCreationDto()
            {
                Date = DateTime.Now,
                SeasonId = _TestSeason.Id,
                HomeTeamId = _Participant1.Id,
                AwayTeamId = _Participant2.Id
            };

            var addedFixture = _fixtureRepository.AddFixture(fixture);

            var fixtureFromDb = _fixtureRepository.GetFixture(addedFixture.Id);

            Assert.AreEqual(fixture.HomeTeamId, fixtureFromDb.HomeTeam.Id);

        }

        [Test]
        public void CanGetMultipleFixturesThatHaveBeenAdded()
        {
            _context.Fixtures.RemoveRange(_context.Fixtures);
            _context.SaveChanges();

            var fixture = new FixtureCreationDto()
            {
                Date = DateTime.Now,
                SeasonId = _TestSeason.Id,
                HomeTeamId = _Participant1.Id,
                AwayTeamId = _Participant2.Id
            };

            var addedFixture = _fixtureRepository.AddFixture(fixture);

            var fixture2 = new FixtureCreationDto()
            {
                Date = DateTime.Now,
                SeasonId = _TestSeason.Id,
                HomeTeamId = _Participant2.Id,
                AwayTeamId = _Participant1.Id
            };

            var addedFixture2 = _fixtureRepository.AddFixture(fixture);

            var fixturesFromDb = _fixtureRepository.GetAllFixtures();

            Assert.AreEqual(2, fixturesFromDb.Count());
        }

        [Test]
        public void CanDeleteFixture()
        {
            var fixture = new FixtureCreationDto()
            {
                Date = DateTime.Now,
                SeasonId = _TestSeason.Id,
                HomeTeamId = _Participant1.Id,
                AwayTeamId = _Participant2.Id
            };

            var deletedFixture = _fixtureRepository.AddFixture(fixture);

            _fixtureRepository.DeleteFixture(deletedFixture);
            var fixtureFromDb = _fixtureRepository.GetFixture(deletedFixture.Id);

            Assert.IsNull(fixtureFromDb);
        }

        [Test]
        public void CanUpdateFixture()
        {
            var fixture = new FixtureCreationDto()
            {
                Date = DateTime.Now,
                SeasonId = _TestSeason.Id,
                HomeTeamId = _Participant1.Id,
                AwayTeamId = _Participant2.Id
            };

            var savedFixture = _fixtureRepository.AddFixture(fixture);

            var newDate = DateTime.Now.AddDays(7);

            var updatedFixture = new FixtureUpdateDto
            {
                Id = savedFixture.Id,
                Date = newDate,
                SeasonId = _TestSeason.Id,
                HomeTeamId = _Participant1.Id,
                AwayTeamId = _Participant2.Id,
                AwayTeamScore = 0,
                HomeTeamScore = 0,
                Complete = false
            };

            _fixtureRepository.UpdateFixture(updatedFixture);

            var fixtureFromDb = _fixtureRepository.GetFixture(savedFixture.Id);

            Assert.AreEqual(newDate, fixtureFromDb.Date);
        }
    }
}