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
    public class SeasonRepositoryTests
    {

        private readonly LeagueAppContext _context;
        private readonly ISeasonRepository _seasonRepository;
        private readonly League _TestLeague;
        private readonly Club _TestClub;

        private readonly Squad _Participant1;
        private readonly Squad _Participant2;


        public SeasonRepositoryTests()
        {
            _context = new InMemoryDbContextFactory().GetDbContext();
            _seasonRepository = new SeasonRepository(_context, new FixtureRepository(_context));

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
        public void CanAddSeason()
        {

            Assert.DoesNotThrow(() =>
            {
                var season = new SeasonCreationDto()
                {
                    Name = "Test season 1",
                    LeagueId = _TestLeague.Id,
                    Active = true
                };

                _seasonRepository.AddSeason(season);
            });

        }

        [Test]
        public void CanGetSeasonThatHasBeenAdded()
        {

            var season = new SeasonCreationDto()
            {
                Name = "Test season 1",
                LeagueId = _TestLeague.Id,
                Active = true
            };

            var addedSeason = _seasonRepository.AddSeason(season);

            var seasonFromDb = _seasonRepository.GetSeason(addedSeason.Id);

            Assert.AreEqual(season.Name, seasonFromDb.Name);

        }

        [Test]
        public void CanGetMultipleSeasonsThatHasBeenAdded()
        {
            _context.Seasons.RemoveRange(_context.Seasons);
            _context.SaveChanges();

            var season = new SeasonCreationDto()
            {
                Name = "Test season 1",
                LeagueId = _TestLeague.Id,
                Active = false
            };

            var addedSeason = _seasonRepository.AddSeason(season);

            var season2 = new SeasonCreationDto()
            {
                Name = "Test season 2",
                LeagueId = _TestLeague.Id,
                Active = true
            };

            var addedSeason2 = _seasonRepository.AddSeason(season2);

            var seasonsFromDb = _seasonRepository.GetAllSeasons();

            Assert.AreEqual(2, seasonsFromDb.Count());
        }

        [Test]
        public void CanDeleteSeason()
        {
            var season = new SeasonCreationDto()
            {
                Name = "Test season 1",
                LeagueId = _TestLeague.Id,
                Active = true
            };
            var deletedSeason = _seasonRepository.AddSeason(season);

            _seasonRepository.DeleteSeason(deletedSeason);
            var seasonFromDb = _seasonRepository.GetSeason(deletedSeason.Id);

            Assert.IsNull(seasonFromDb);
        }

        [Test]
        public void CanUpdateSeason()
        {
            var season = new SeasonCreationDto()
            {
                Name = "Test season 1",
                LeagueId = _TestLeague.Id,
                Active = true
            };
            var savedSeason = _seasonRepository.AddSeason(season);

            var newName = "Updated Test Season";

            var updatedSeason = new SeasonUpdateDto
            {
                Id = savedSeason.Id,
                Name = newName,
                Active = true
            };

            _seasonRepository.UpdateSeason(updatedSeason);

            var seasonFromDb = _seasonRepository.GetSeason(savedSeason.Id);

            Assert.AreEqual(newName, seasonFromDb.Name);
        }

        [Test]
        public void SeasonIsValiatedWhenAddedAndExceptionsRetunedWhenErroneous()
        {

            var season = new SeasonCreationDto()
            {
                Name = "Test season 1 has a really long name that should cause a validation error as it exceedes the length limit",
                Active = true,
                LeagueId = _TestLeague.Id
            };

            var exception = Assert.Throws<AppException>(() => _seasonRepository.AddSeason(season));
            Assert.That(exception.Message, Is.EqualTo(" Name can't be longer than 40 characters."));

        }

        [Test]
        public void CreatingASeasonCreatesFixturesAssociatedWithThatSeason()
        {
            var season = new SeasonCreationDto()
            {
                Name = "Test season 1",
                LeagueId = _TestLeague.Id,
                Active = true
            };

            var addedSeason = _seasonRepository.AddSeason(season);

            // Number of teams times 2 (Home and away) - 2 as you cant play yourself
            var expectedNumberOfFixturesPerTeam = ((_TestLeague.ParticipantSquads.Count * 2) - 2);
            // Times by total teams, then half as the home and away point of view of seperate teams are only 1 real fixture
            var totalExpectedFixtures = (_TestLeague.ParticipantSquads.Count * expectedNumberOfFixturesPerTeam) / 2;

            Assert.AreEqual(totalExpectedFixtures, addedSeason.Fixtures.Count);

            var fixturesInDb = _context.Fixtures.Where(x => x.Season == addedSeason);

            Assert.AreEqual(totalExpectedFixtures, fixturesInDb.Count());
        }

        [Test]
        public void ThrowsErrorWhenSeasonCreatedWithoutEnoughParticipantsToCreateFixtures()
        {
            var erroneousLeague = new League
            {
                Id = 2,
                Name = "Test League",
                ParticipantSquads = new Collection<Squad>(),
                Seasons = new Collection<Season>(),
                isDeleted = false
            };

            _context.Leagues.Add(erroneousLeague);
            _context.SaveChanges();

            var season = new SeasonCreationDto()
            {
                Name = "Error Test season 1",
                LeagueId = erroneousLeague.Id,
                Active = true
            };

            var exception = Assert.Throws<AppException>(() => _seasonRepository.AddSeason(season));
            Assert.That(exception.Message, Is.EqualTo("League requires at least 2 participating teams"));

        }

        [Test]
        public void ThrowsErrorWhenSeasonCreatedForInvalidLeague()
        {
            var season = new SeasonCreationDto()
            {
                Name = "Error Test season 1",
                LeagueId = 99999,
                Active = true
            };

            var exception = Assert.Throws<AppException>(() => _seasonRepository.AddSeason(season));
            Assert.That(exception.Message, Is.EqualTo("League does not exist"));

        }

    }
}