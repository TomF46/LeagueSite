
using System;

public class FixtureSimpleDto
{
    public int Id { get; set; }
    public DateTime? Date { get; set; }
    public int SeasonId { get; set; }
    public int HomeTeamId { get; set; }

    public string HomeTeamName { get; set; }
    public int AwayTeamId { get; set; }

    public string AwayTeamName { get; set; }
    public int HomeScore { get; set; }
    public int AwayScore { get; set; }
    public bool Complete { get; set; }
}