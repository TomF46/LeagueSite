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
            _context.SaveChanges();
        }

        [Test]
        public void CanAddSeason()
        {

            Assert.DoesNotThrow(() =>
            {
                var league = new SeasonCreationDto()
                {
                    Name = "Test league 1",
                    LeagueId = _TestLeague.Id,
                    Active = true
                };

                _seasonRepository.AddSeason(league);
            });

        }

        [Test]
        public void CanGetSeasonThatHasBeenAdded()
        {

            var league = new SeasonCreationDto()
            {
                Name = "Test league 1",
                LeagueId = _TestLeague.Id,
                Active = true
            };

            var addedSeason = _seasonRepository.AddSeason(league);

            var leagueFromDb = _seasonRepository.GetSeason(addedSeason.Id);

            Assert.AreEqual(league.Name, leagueFromDb.Name);

        }

        [Test]
        public void CanGetMultipleSeasonsThatHasBeenAdded()
        {
            _context.Seasons.RemoveRange(_context.Seasons);
            _context.SaveChanges();

            var league = new SeasonCreationDto()
            {
                Name = "Test league 1",
                LeagueId = _TestLeague.Id,
                Active = false
            };

            var addedSeason = _seasonRepository.AddSeason(league);

            var league2 = new SeasonCreationDto()
            {
                Name = "Test league 2",
                LeagueId = _TestLeague.Id,
                Active = true
            };

            var addedSeason2 = _seasonRepository.AddSeason(league2);

            var leaguesFromDb = _seasonRepository.GetAllSeasons();

            Assert.AreEqual(2, leaguesFromDb.Count());
        }

        [Test]
        public void CanDeleteSeason()
        {
            var league = new SeasonCreationDto()
            {
                Name = "Test league 1",
                LeagueId = _TestLeague.Id,
                Active = true
            };
            var deletedLeague = _seasonRepository.AddSeason(league);

            _seasonRepository.DeleteSeason(deletedLeague);
            var leagueFromDb = _seasonRepository.GetSeason(deletedLeague.Id);

            Assert.IsNull(leagueFromDb);
        }

        [Test]
        public void CanUpdateSeason()
        {
            var league = new SeasonCreationDto()
            {
                Name = "Test league 1",
                LeagueId = _TestLeague.Id,
                Active = true
            };
            var savedLeague = _seasonRepository.AddSeason(league);

            var newName = "Updated Test Season";

            var updatedSeason = new SeasonUpdateDto
            {
                Id = savedLeague.Id,
                Name = newName,
                Active = true
            };

            _seasonRepository.UpdateSeason(updatedSeason);

            var leagueFromDb = _seasonRepository.GetSeason(savedLeague.Id);

            Assert.AreEqual(newName, leagueFromDb.Name);
        }

        [Test]
        public void SeasonIsValiatedWhenAddedAndExceptionsRetunedWhenErroneous()
        {

            var league = new SeasonCreationDto()
            {
                Name = "Test league 1 has a really long name that should cause a validation error as it exceedes the length limit",
                Active = true,
                LeagueId = _TestLeague.Id
            };

            var exception = Assert.Throws<AppException>(() => _seasonRepository.AddSeason(league));
            Assert.That(exception.Message, Is.EqualTo(" Name can't be longer than 40 characters."));

        }

    }
}