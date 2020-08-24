using System.Collections.Generic;

public class League
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Squad> ParticipantSquads { get; set; }

}