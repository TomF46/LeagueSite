using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class SeasonStats
{
    public int MatchesPlayed { get; set; }
    public int GoalsScored { get; set; }
    public int GoalsScoredByUnknown { get; set; }

    public ICollection<GoalScorerRecord> TopGoalScorers { get; set; }
}

public class GoalScorerRecord
{
    public int Amount { get; set; }
    public PlayerSimpleDto Player { get; set; }
}