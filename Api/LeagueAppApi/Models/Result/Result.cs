using System.Collections.Generic;

public class Result
{
    public int FixtureId { get; set; }
    public int HomeScore { get; set; }
    public ICollection<GoalScorer> HomeGoalScorers { get; set; }
    public int AwayScore { get; set; }
    public ICollection<GoalScorer> AwayGoalScorers { get; set; }

}