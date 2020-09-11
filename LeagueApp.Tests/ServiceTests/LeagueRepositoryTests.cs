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
    public class LeagueRepositoryTests
    {

        private readonly LeagueAppContext _context;
        private readonly ILeagueRepository _leagueRepository;

        public LeagueRepositoryTests()
        {
            _context = new InMemoryDbContextFactory().GetDbContext();
            _leagueRepository = new LeagueRepository(_context, new SeasonRepository(_context, new FixtureRepository(_context)));
        }

        [SetUp]
        public void SetUp()
        {
            _context.Leagues.RemoveRange(_context.Leagues);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Leagues.RemoveRange(_context.Leagues);
            _context.SaveChanges();
        }

        [Test]
        public void CanAddLeague()
        {

            Assert.DoesNotThrow(() =>
            {
                var league = new LeagueCreationDto()
                {
                    Name = "Test league 1"
                };

                _leagueRepository.AddLeague(league);
            });

        }

        [Test]
        public void CanGetLeagueThatHasBeenAdded()
        {

            var league = new LeagueCreationDto()
            {
                Name = "Test league 1",
            };

            var addedLeague = _leagueRepository.AddLeague(league);

            var leagueFromDb = _leagueRepository.GetLeague(addedLeague.Id);

            Assert.AreEqual(league.Name, leagueFromDb.Name);

        }

        [Test]
        public void CanGetMultipleLeaguesThatHasBeenAdded()
        {

            var league = new LeagueCreationDto()
            {
                Name = "Test league 1",
            };

            var addedLeague = _leagueRepository.AddLeague(league);

            var league2 = new LeagueCreationDto()
            {
                Name = "Test league 2",
            };

            var addedLeague2 = _leagueRepository.AddLeague(league2);

            var league3 = new LeagueCreationDto()
            {
                Name = "Test league 3",
            };

            var addedLeague3 = _leagueRepository.AddLeague(league3);

            var leaguesFromDb = _leagueRepository.GetAllLeagues();

            Assert.AreEqual(3, leaguesFromDb.Count());
            Assert.AreEqual(league3.Name, leaguesFromDb.Last().Name);
        }

        [Test]
        public void CanDeleteLeague()
        {
            var league = new League
            {
                Id = 1,
                Name = "Test League",
                ParticipantSquads = new Collection<Squad>(),
                Seasons = new Collection<Season>(),
                isDeleted = false
            };

            _context.Leagues.Add(league);
            _context.SaveChanges();

            _leagueRepository.DeleteLeague(league);
            var leagueFromDb = _leagueRepository.GetLeague(league.Id);

            Assert.IsNull(leagueFromDb);
        }

        [Test]
        public void CanUpdateLeague()
        {
            var league = new League
            {
                Id = 1,
                Name = "Test League",
                ParticipantSquads = new Collection<Squad>(),
                Seasons = new Collection<Season>(),
                isDeleted = false
            };

            _context.Leagues.Add(league);
            _context.SaveChanges();

            var newName = "Updated Test League";

            var updatedLeague = new LeagueUpdateDto
            {
                Id = 1,
                Name = newName
            };

            _leagueRepository.UpdateLeague(updatedLeague);

            var leagueFromDb = _leagueRepository.GetLeague(league.Id);

            Assert.AreEqual(newName, leagueFromDb.Name);
        }

        [Test]
        public void LeagueIsValiatedWhenAddedAndExceptionsRetunedWhenErroneous()
        {

            var league = new LeagueCreationDto()
            {
                Name = "Test league 1 has a really long name that should cause a validation error as it exceedes the length limit",
            };

            var exception = Assert.Throws<AppException>(() => _leagueRepository.AddLeague(league));
            Assert.That(exception.Message, Is.EqualTo(" Name can't be longer than 40 characters."));

        }

    }
}