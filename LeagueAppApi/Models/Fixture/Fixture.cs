
using System;
using System.Collections.Generic;

public class Fixture
{
    public int Id { get; set; }
    public DateTime? Date { get; set; }
    public Season Season { get; set; }
    public Squad HomeTeam { get; set; }
    public Squad AwayTeam { get; set; }
    public int HomeScore { get; set; }
    public int AwayScore { get; set; }
    public ICollection<GoalRecord> Goals { get; set; }

    public bool Complete { get; set; }
    public bool isDeleted { get; set; }
}