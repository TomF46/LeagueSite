using System.Collections.Generic;

public class Season
{
    public int Id { get; set; }
    public string Name { get; set; }
    public League League { get; set; }
    public bool Active { get; set; }
    public ICollection<Fixture> Fixtures { get; set; }
}