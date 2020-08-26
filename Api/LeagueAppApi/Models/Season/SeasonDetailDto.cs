using System.Collections.Generic;

public class SeasonDetailDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int LeagueId { get; set; }

    public string LeagueName { get; set; }
    public bool Active { get; set; }
    public ICollection<FixtureSimpleDto> Fixtures { get; set; }
}