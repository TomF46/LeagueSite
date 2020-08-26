using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using LeagueAppApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LeagueAppApi.Services
{
    public class ResultRepository : IResultRepository
    {
        private LeagueAppContext _context;
        private IFixtureRepository _fixtureRepository;
        public ResultRepository(LeagueAppContext context, IFixtureRepository fixtureRepository)
        {
            _context = context;
            _fixtureRepository = fixtureRepository;
        }

        public Fixture AddResult(Result result)
        {
            var fixture = _context.Fixtures.FirstOrDefault(fixture => fixture.Id == result.FixtureId);
            if (fixture == null) throw new Exception("Fixture does not exist");

            fixture.HomeScore = result.HomeScore;
            fixture.AwayScore = result.AwayScore;
            fixture.Complete = true;
            _context.SaveChanges();
            return fixture;
        }

        public void DeleteResult(Fixture fixture)
        {
            fixture.HomeScore = 0;
            fixture.AwayScore = 0;
            fixture.Complete = false;
            _context.SaveChanges();
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void UpdateResult(Result result)
        {
            var fixture = _context.Fixtures.FirstOrDefault(fixture => fixture.Id == result.FixtureId);
            if (fixture == null) throw new Exception("Fixture does not exist");

            fixture.HomeScore = result.HomeScore;
            fixture.AwayScore = result.AwayScore;
            fixture.Complete = true;
            _context.SaveChanges();
        }
    }
}