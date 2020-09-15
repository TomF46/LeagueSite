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
    public class StatsServiceTests
    {

        private readonly LeagueAppContext _context;
        private readonly IStatsService _StatsService;
        private readonly League _TestLeague;
        private readonly Season _TestSeason;
        private readonly Club _TestClub;

        private readonly Squad _Participant1;
        private readonly Squad _Participant2;
        private readonly Fixture _TestFixture;
        private readonly Fixture _TestFixture2;


        public StatsServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDbContext();
            _StatsService = new StatsService(_context);

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

            _TestFixture = new Fixture
            {
                Id = 1,
                Date = DateTime.Now,
                Season = _TestSeason,
                Complete = true,
                HomeTeam = _Participant1,
                HomeScore = 2,
                AwayTeam = _Participant2,
                AwayScore = 1,
                isDeleted = false
            };

            _TestFixture2 = new Fixture
            {
                Id = 2,
                Date = DateTime.Now,
                Season = _TestSeason,
                Complete = true,
                HomeTeam = _Participant2,
                HomeScore = 0,
                AwayTeam = _Participant1,
                AwayScore = 3,
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
            _context.Fixtures.Add(_TestFixture);
            _context.Fixtures.Add(_TestFixture2);
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
        public void CanGenerateStat()
        {
            Assert.DoesNotThrow(() =>
            {
                _StatsService.GetStats(_TestSeason.Id);
            });
        }

        [Test]
        public void CanGenerateStatForMatchesPlayed()
        {
            var stats = _StatsService.GetStats(_TestSeason.Id);
            Assert.AreEqual(2, stats.MatchesPlayed);
        }

        [Test]
        public void CanGenerateStatForGoalsScored()
        {
            var stats = _StatsService.GetStats(_TestSeason.Id);
            Assert.AreEqual(6, stats.GoalsScored);
        }
    }
}