using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Player
{
    public int Id { get; set; }
    [Required]
    [StringLength(40, ErrorMessage = "First name can't be longer than 40 characters.")]
    public string FirstName { get; set; }
    [Required]
    [StringLength(40, ErrorMessage = "Last name can't be longer than 40 characters.")]
    public string LastName { get; set; }
    [NotMapped]
    public string DisplayName
    {
        get { return FirstName + " " + LastName; }
    }
    public string Position { get; set; }

    public Squad Squad { get; set; }
    public Club Club { get; set; }
    public ICollection<GoalRecord> Goals { get; set; }
    public bool isDeleted { get; set; }
}