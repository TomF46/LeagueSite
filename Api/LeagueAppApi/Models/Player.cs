public class Player
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Position { get; set; }

    public Squad Squad { get; set; }
    public Club Club { get; set; }
}