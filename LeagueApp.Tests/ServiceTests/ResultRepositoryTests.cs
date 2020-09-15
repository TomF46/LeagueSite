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
    public class ResultRepositoryTests
    {

        private readonly LeagueAppContext _context;
        private readonly IResultRepository _resultRepository;
        private readonly League _TestLeague;
        private readonly Season _TestSeason;
        private readonly Club _TestClub;

        private readonly Squad _Participant1;
        private readonly Squad _Participant2;
        private readonly Fixture _TestFixture;


        public ResultRepositoryTests()
        {
            _context = new InMemoryDbContextFactory().GetDbContext();
            _resultRepository = new ResultRepository(_context, new FixtureRepository(_context));

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
                Complete = false,
                HomeTeam = _Participant1,
                AwayTeam = _Participant2,
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
        public void CanAddResult()
        {

            Assert.DoesNotThrow(() =>
            {
                var result = new Result()
                {
                    FixtureId = _TestFixture.Id,
                    HomeScore = 2,
                    HomeGoalScorers = new Collection<GoalScorer>(),
                    AwayScore = 0,
                    AwayGoalScorers = new Collection<GoalScorer>(),
                };

                _resultRepository.AddResult(result);
            });

        }

        [Test]
        public void ItThrowsAnErrorIfAResultIsAddedForAFixtureThatDoesntExist()
        {

            var result = new Result()
            {
                FixtureId = 999,
                HomeScore = 2,
                HomeGoalScorers = new Collection<GoalScorer>(),
                AwayScore = 0,
                AwayGoalScorers = new Collection<GoalScorer>(),
            };

            var exception = Assert.Throws<AppException>(() => _resultRepository.AddResult(result));
            Assert.That(exception.Message, Is.EqualTo("Fixture does not exist"));

        }

        [Test]
        public void CanUpdateResult()
        {
            var result = new Result()
            {
                FixtureId = _TestFixture.Id,
                HomeScore = 2,
                HomeGoalScorers = new Collection<GoalScorer>(),
                AwayScore = 0,
                AwayGoalScorers = new Collection<GoalScorer>(),
            };

            var addedResult = _resultRepository.AddResult(result);

            result.AwayScore = 2;

            _resultRepository.UpdateResult(result);
            var fixtureFromDb = _context.Fixtures.FirstOrDefault(x => x.Id == addedResult.Id);

            Assert.AreEqual(2, fixtureFromDb.AwayScore);
        }

        [Test]
        public void CanDeleteResult()
        {
            var result = new Result()
            {
                FixtureId = _TestFixture.Id,
                HomeScore = 2,
                HomeGoalScorers = new Collection<GoalScorer>(),
                AwayScore = 0,
                AwayGoalScorers = new Collection<GoalScorer>(),
            };

            var addedResult = _resultRepository.AddResult(result);
            var fixtureFromDb = _context.Fixtures.FirstOrDefault(x => x.Id == addedResult.Id);

            Assert.IsTrue(fixtureFromDb.Complete);

            _resultRepository.DeleteResult(fixtureFromDb);
            fixtureFromDb = _context.Fixtures.FirstOrDefault(x => x.Id == addedResult.Id);

            Assert.IsFalse(fixtureFromDb.Complete);
        }

        [Test]
        public void CanAddResultWithKnownGoalScorer()
        {

            var scorer = new Player
            {
                Id = 1,
                FirstName = "Test",
                LastName = "Player",
                Position = "Forward",
                Club = _TestClub,
                Squad = _Participant1,
                Goals = new Collection<GoalRecord>(),
                isDeleted = false
            };
            _context.Players.Add(scorer);
            _context.SaveChanges();

            var result = new Result()
            {
                FixtureId = _TestFixture.Id,
                HomeScore = 1,
                HomeGoalScorers = new Collection<GoalScorer>(){
                    new GoalScorer{
                        PlayerId = scorer.Id
                    }
                },
                AwayScore = 0,
                AwayGoalScorers = new Collection<GoalScorer>(),
            };

            var addedResult = _resultRepository.AddResult(result);

            var fixture = _context.Fixtures.FirstOrDefault(fixture => fixture.Id == result.FixtureId);

            Assert.IsTrue(fixture.Goals.FirstOrDefault(x => x.PlayerId == scorer.Id) != null);
        }

        [Test]
        public void ItThrowsAnErrorIfAGoalScorerWhoDoesntExistIsAdded()
        {

            var result = new Result()
            {
                FixtureId = _TestFixture.Id,
                HomeScore = 1,
                HomeGoalScorers = new Collection<GoalScorer>(){
                    new GoalScorer{
                        PlayerId = 999
                    }
                },
                AwayScore = 0,
                AwayGoalScorers = new Collection<GoalScorer>(),
            };

            var exception = Assert.Throws<AppException>(() => _resultRepository.AddResult(result));
            Assert.That(exception.Message, Is.EqualTo("Player does not exist"));
        }
    }
}