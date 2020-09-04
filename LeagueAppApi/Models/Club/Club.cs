using System.Collections.Generic;

public class Club
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Location { get; set; }
    public ICollection<Squad> Squads { get; set; }
    public bool isDeleted { get; set; }

}