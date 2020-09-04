using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using LeagueAppApi.Models;
using LeagueAppApi.Services;
using Microsoft.EntityFrameworkCore;

namespace LeagueAppApi.Services
{
    public class FixtureRepository : IFixtureRepository
    {
        private LeagueAppContext _context;
        public FixtureRepository(LeagueAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Fixture> GetAllFixtures()
        {
            return _context.Fixtures.Include(x => x.HomeTeam).Include(x => x.AwayTeam).Include(x => x.Season).Where(x => !x.isDeleted);
        }

        public Fixture GetFixture(int id)
        {
            return _context.Fixtures.Include(x => x.HomeTeam).ThenInclude(x => x.Club).Include(x => x.AwayTeam).ThenInclude(x => x.Club).Include(x => x.Season).Include(x => x.Goals).ThenInclude(x => x.Player).FirstOrDefault(x => x.Id == id && !x.isDeleted);
        }

        public Fixture AddFixture(FixtureCreationDto fixtureDto)
        {

            var season = _context.Seasons.FirstOrDefault(season => season.Id == fixtureDto.SeasonId && !season.isDeleted);
            if (season == null) throw new Exception("Season does not exist"); //TODO return error nicely

            var homeSquad = _context.Squads.FirstOrDefault(squad => squad.Id == fixtureDto.HomeTeamId && !squad.isDeleted);
            if (homeSquad == null) throw new Exception("Home squad does not exist"); //TODO return error nicely

            var awaySquad = _context.Squads.FirstOrDefault(squad => squad.Id == fixtureDto.AwayTeamId && !squad.isDeleted);
            if (awaySquad == null) throw new Exception("Away squad does not exist"); //TODO return error nicely


            var fixture = new Fixture
            {
                Date = fixtureDto.Date,
                Season = season,
                HomeTeam = homeSquad,
                AwayTeam = awaySquad,
                Complete = false
            };
            _context.Fixtures.Add(fixture);
            _context.SaveChanges();
            return fixture;
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void DeleteFixture(Fixture fixture)
        {
            fixture.isDeleted = true;
            _context.SaveChanges();
        }

        public void UpdateFixture(FixtureUpdateDto fixture)
        {
            var fixtureToUpdate = GetFixture(fixture.Id);
            fixtureToUpdate.Date = fixture.Date;
            fixtureToUpdate.Complete = fixture.Complete;
            fixtureToUpdate.HomeScore = fixtureToUpdate.HomeScore;
            fixtureToUpdate.AwayScore = fixtureToUpdate.AwayScore;

            _context.SaveChanges();
            return;
        }
    }
}