using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
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
            if (league == null) throw new AppException("League does not exist"); //TODO return error nicely

            var season = new Season
            {
                Name = seasonDto.Name,
                Active = seasonDto.Active,
                League = league
            };

            season.Fixtures = CreateSeasonFixtures(season);
            validate(season);

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
            validate(seasonToUpdate);
            _context.SaveChanges();
            return;
        }

        //TODO improve
        private ICollection<Fixture> CreateSeasonFixtures(Season season)
        {
            var participants = season.League.ParticipantSquads;
            var fixtures = participants.SelectMany((team1, index) =>
            participants.Skip(index + 1).
            Select(team2 => new Fixture
            {
                Complete = false,
                Season = season,
                HomeTeam = team1,
                AwayTeam = team2
            })).ToList();

            var OppositeFixtures = participants.SelectMany((team1, index) =>
            participants.Skip(index + 1).
            Select(team2 => new Fixture
            {
                Complete = false,
                Season = season,
                HomeTeam = team2,
                AwayTeam = team1
            })).ToList();

            fixtures.AddRange(OppositeFixtures);

            fixtures = fixtures.OrderBy(a => Guid.NewGuid()).ToList(); // randomize fixture list

            var participant = participants.First();
            var numberOfGameWeeks = fixtures.Where(fixture => fixture.HomeTeam == participant || fixture.AwayTeam == participant).Count();
            var weeks = new List<DateTime>();

            for (int i = 0; i < numberOfGameWeeks + 10; i++)
            {
                if (i == 0) weeks.Add(DateTime.Now);
                weeks.Add(DateTime.Now.AddDays(7 * i));
            }

            participants.ToList().ForEach(participant =>
            {
                var startDate = DateTime.Now;
                var teamHomeFixtures = fixtures.Where(fixture => fixture.HomeTeam.Id == participant.Id);

                teamHomeFixtures.ToList().ForEach(fixture =>
                {
                    weeks.ForEach(week =>
                    {
                        var homeTeamHasFixtureInWeek = fixtures.Where(x => x.Date.HasValue).FirstOrDefault(x => x.Date.Value.Date == week.Date && (x.AwayTeam.Id == fixture.HomeTeam.Id || x.HomeTeam.Id == fixture.HomeTeam.Id));
                        var OppoHasGameOnDate = fixtures.Where(x => x.Date.HasValue).FirstOrDefault(x => x.Date.Value.Date == week.Date && (x.AwayTeam.Id == fixture.AwayTeam.Id || x.HomeTeam.Id == fixture.AwayTeam.Id));
                        if (homeTeamHasFixtureInWeek == null && OppoHasGameOnDate == null && fixture.Date == null)
                        {
                            fixture.Date = week;
                        }
                    });
                });
            });



            return fixtures;
        }

        private void validate(Season season)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(season, null, null);
            if (!Validator.TryValidateObject(season, context, results, true))
            {
                var message = "";
                results.ForEach(exception =>
                {
                    message = $"{message} {exception.ErrorMessage}";
                });
                throw new AppException(message);
            }
        }


    }
}