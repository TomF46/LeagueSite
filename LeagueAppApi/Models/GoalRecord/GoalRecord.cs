public class GoalRecord
{
    public int PlayerId { get; set; }
    public Player Player { get; set; }
    public int FixtureId { get; set; }
    public Fixture Fixture { get; set; }
    public SideEnum Side { get; set; }
}