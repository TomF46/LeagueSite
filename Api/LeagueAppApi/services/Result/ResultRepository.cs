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
            fixture.Goals = GetGoalsForResult(result, fixture);
            _context.SaveChanges();
            return fixture;
        }

        private ICollection<GoalRecord> GetGoalsForResult(Result result, Fixture fixture)
        {
            var goals = new Collection<GoalRecord>();

            result.HomeGoalScorers.ToList().ForEach(goal =>
            {
                var player = _context.Players.FirstOrDefault(storedPlayer => storedPlayer.Id == goal.PlayerId);
                if (player == null) throw new Exception("Player does not exist");

                goals.Add(new GoalRecord
                {
                    Side = SideEnum.Home,
                    Fixture = fixture,
                    FixtureId = fixture.Id,
                    Player = player,
                    PlayerId = player.Id
                });
            });

            result.AwayGoalScorers.ToList().ForEach(goal =>
            {
                var player = _context.Players.FirstOrDefault(storedPlayer => storedPlayer.Id == goal.PlayerId);
                if (player == null) throw new Exception("Player does not exist");

                goals.Add(new GoalRecord
                {
                    Side = SideEnum.Away,
                    Fixture = fixture,
                    FixtureId = fixture.Id,
                    Player = player,
                    PlayerId = player.Id
                });
            });

            return goals;
        }

        public void DeleteResult(Fixture fixture)
        {
            fixture.HomeScore = 0;
            fixture.AwayScore = 0;
            fixture.Complete = false;
            fixture.Goals = new Collection<GoalRecord>();

            var goalRecordsToRemove = _context.GoalRecords.Where(gr => gr.FixtureId == fixture.Id);
            _context.GoalRecords.RemoveRange(goalRecordsToRemove);
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