using System.ComponentModel.DataAnnotations.Schema;

public class Player
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    [NotMapped]
    public string DisplayName
    {
        get { return FirstName + " " + LastName; }
    }
    public string Position { get; set; }

    public Squad Squad { get; set; }
    public Club Club { get; set; }
}