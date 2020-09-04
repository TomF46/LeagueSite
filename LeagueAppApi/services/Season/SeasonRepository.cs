using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using LeagueAppApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LeagueAppApi.Services
{
    public class SeasonRepository : ISeasonRepository
    {
        private LeagueAppContext _context;
        private IFixtureRepository _fixtureRepository;
        public SeasonRepository(LeagueAppContext context, IFixtureRepository fixtureRepository)
        {
            _context = context;
            _fixtureRepository = fixtureRepository;
        }

        public IEnumerable<Season> GetAllSeasons()
        {
            return _context.Seasons.Include(x => x.League).Where(x => !x.isDeleted);
        }

        public Season GetSeason(int id)
        {
            return _context.Seasons.Include(x => x.League).Include(x => x.Fixtures).ThenInclude(x => x.HomeTeam).ThenInclude(x => x.Club).Include(x => x.Fixtures).ThenInclude(x => x.AwayTeam).ThenInclude(x => x.Club).FirstOrDefault(x => x.Id == id && !x.isDeleted);
        }

        public Season AddSeason(SeasonCreationDto seasonDto)
        {

            //TODO create fixtures
            var league = _context.Leagues.Include(x => x.ParticipantSquads).FirstOrDefault(league => league.Id == seasonDto.LeagueId && !league.isDeleted);
            if (league == null) throw new Exception("League does not exist"); //TODO return error nicely

            var season = new Season
            {
                Name = seasonDto.Name,
                Active = seasonDto.Active,
                League = league
            };

            season.Fixtures = CreateSeasonFixtures(season);

            _context.Seasons.Add(season);

            _context.SaveChanges();
            return season;

        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void DeleteSeason(Season season)
        {
            var fixturesToRemove = _context.Fixtures.Where(x => x.Season.Id == season.Id);
            fixturesToRemove.ToList().ForEach(fixture =>
            {
                fixture.isDeleted = true;
            });
            season.isDeleted = true;
            _context.SaveChanges();
        }

        public void UpdateSeason(SeasonUpdateDto season)
        {
            var seasonToUpdate = GetSeason(season.Id);
            seasonToUpdate.Name = season.Name;
            seasonToUpdate.Active = season.Active;
            _context.SaveChanges();
            return;
        }

        private ICollection<Fixture> CreateSeasonFixtures(Season season)
        {
            var participants = season.League.ParticipantSquads;
            var fixtures = participants.SelectMany((team1, index) =>
            participants.Skip(index + 1).
            Select(team2 => new Fixture
            {
                Date = DateTime.Now,
                Complete = false,
                Season = season,
                HomeTeam = team1,
                AwayTeam = team2
            })).ToList();

            var OppositeFixtures = participants.SelectMany((team1, index) =>
            participants.Skip(index + 1).
            Select(team2 => new Fixture
            {
                Date = DateTime.Now,
                Complete = false,
                Season = season,
                HomeTeam = team2,
                AwayTeam = team1
            })).ToList();

            fixtures.AddRange(OppositeFixtures);



            return fixtures;
        }
    }
}