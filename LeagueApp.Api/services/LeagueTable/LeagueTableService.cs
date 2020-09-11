using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using LeagueApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LeagueApp.Api.Services
{
    public class LeagueTableService : ILeagueTableService
    {
        private LeagueAppContext _context;
        public LeagueTableService(LeagueAppContext context)
        {
            _context = context;
        }

        public LeagueTableDto GenerateTable(Season season)
        {
            var squads = GetLeagueParticipants(season);
            var tableRows = new Collection<LeagueTableRowDto>();

            squads.ToList().ForEach(squad =>
            {
                var row = GetLeagueTableRow(squad, season.Fixtures);
                tableRows.Add(row);
            });

            var leagueTable = new LeagueTableDto
            {
                seasonId = season.Id,
                seasonDisplayName = season.League.Name + " " + season.Name,
                rows = tableRows.OrderByDescending(x => x.Points).ThenByDescending(x => x.GoalDifference).ToList()
            };


            return leagueTable;
        }

        private LeagueTableRowDto GetLeagueTableRow(Squad squad, ICollection<Fixture> fixtures)
        {
            var releventFixtures = fixtures.Where(fixture => fixture.Complete && (fixture.HomeTeam == squad || fixture.AwayTeam == squad));

            var row = new LeagueTableRowDto
            {
                TeamDisplayName = squad.DisplayName,
                GamesPlayed = releventFixtures.Count(),
                GamesWon = 0,
                GamesDrawn = 0,
                GamesLost = 0,
                GoalsScored = 0,
                GoalsConceded = 0,
            };

            releventFixtures.ToList().ForEach(fixture =>
            {
                if (fixture.HomeTeam == squad)
                {
                    row.GoalsScored += fixture.HomeScore;
                    row.GoalsConceded += fixture.AwayScore;
                    if (fixture.HomeScore > fixture.AwayScore) row.GamesWon++;
                    if (fixture.HomeScore == fixture.AwayScore) row.GamesDrawn++;
                    if (fixture.HomeScore < fixture.AwayScore) row.GamesLost++;

                }
                else
                {
                    row.GoalsScored += fixture.AwayScore;
                    row.GoalsConceded += fixture.HomeScore;
                    if (fixture.HomeScore > fixture.AwayScore) row.GamesLost++;
                    if (fixture.HomeScore == fixture.AwayScore) row.GamesDrawn++;
                    if (fixture.HomeScore < fixture.AwayScore) row.GamesWon++;
                }
            });

            row.GoalDifference = row.GoalsScored - row.GoalsConceded;
            row.Points = (row.GamesWon * 3) + (row.GamesDrawn * 1);

            return row;
        }

        private ICollection<Squad> GetLeagueParticipants(Season season)
        {
            var squads = new Collection<Squad>();

            season.Fixtures.ToList().ForEach(fixture =>
            {
                squads.Add(fixture.HomeTeam);
                squads.Add(fixture.AwayTeam);
            });

            //Remove duplicates
            return squads.Distinct().ToList();
        }
    }
}