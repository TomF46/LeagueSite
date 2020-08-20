using System.Collections.Generic;

public class Squad
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Club Club { get; set; }
    public ICollection<Player> Players { get; set; }
}