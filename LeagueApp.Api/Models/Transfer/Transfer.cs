using System;

public class Transfer
{
    public int Id { get; set; }
    public Player Player { get; set; }
    public Squad FromSquad { get; set; }
    public Squad ToSquad { get; set; }
    public DateTime DateCreated { get; set; }
}