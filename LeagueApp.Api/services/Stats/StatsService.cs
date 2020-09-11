using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using LeagueApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LeagueApp.Api.Services
{
    public class StatsService : IStatsService
    {
        private LeagueAppContext _context;
        public StatsService(LeagueAppContext context)
        {
            _context = context;
        }

        public SeasonStats GetStats(int seasonId)
        {
            var season = _context.Seasons.Include(x => x.Fixtures).FirstOrDefault(season => season.Id == seasonId);
            if (season == null) throw new AppException("Season does not exist");

            var stats = new SeasonStats();

            stats.MatchesPlayed = season.Fixtures.Where(x => x.Complete).Count();

            stats.GoalsScored = season.Fixtures.Sum(x => x.HomeScore + x.AwayScore);

            var fixturesIds = season.Fixtures.Select(x => x.Id);

            var seasonGoalRecords = _context.GoalRecords.Include(x => x.Player).ThenInclude(x => x.Club).Include(x => x.Player).ThenInclude(x => x.Squad).Where(x => fixturesIds.Contains(x.FixtureId));

            stats.GoalsScoredByUnknown = stats.GoalsScored - seasonGoalRecords.Count();

            stats.TopGoalScorers = seasonGoalRecords.ToList().GroupBy(record => record.Player)
            .Select(group => new GoalScorerRecord
            {
                Amount = group.Count(),
                Player = getPlayerData(group.First().Player)
            }).OrderByDescending(x => x.Amount).Take(20).ToList();

            return stats;

        }

        private PlayerSimpleDto getPlayerData(Player player)
        {
            return new PlayerSimpleDto
            {
                Id = player.Id,
                FirstName = player.FirstName,
                LastName = player.LastName,
                DisplayName = player.DisplayName,
                Position = player.Position,
                ClubId = player.Club.Id,
                ClubName = player.Club.Name,
                SquadId = player.Squad.Id,
                SquadName = player.Squad.Name
            };
        }
    }
}