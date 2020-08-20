using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

public class Squad
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Club Club { get; set; }
    public ICollection<Player> Players { get; set; }
    [NotMapped]
    public string DisplayName
    {
        get { return Club.Name + " " + Name; }
    }
}