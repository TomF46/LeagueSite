
using System;

public class FixtureUpdateDto
{
    public int Id { get; set; }
    public DateTime? Date { get; set; }
    public int SeasonId { get; set; }
    public int HomeTeamId { get; set; }
    public int AwayTeamId { get; set; }
    public int HomeTeamScore { get; set; }

    public int AwayTeamScore { get; set; }
    public bool Complete { get; set; }
}