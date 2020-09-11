using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Squad
{
    public int Id { get; set; }
    [Required]
    [StringLength(40, ErrorMessage = "Name cannot be longer than 40 characters.")]
    public string Name { get; set; }
    public Club Club { get; set; }
    public ICollection<Player> Players { get; set; }
    public League League { get; set; }
    public bool isDeleted { get; set; }
    [NotMapped]
    public string DisplayName
    {
        get { return Club.Name + " " + Name; }
    }
}