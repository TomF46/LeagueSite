using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Club
{
    public int Id { get; set; }
    [Required]
    [StringLength(40, ErrorMessage = "Name can't be longer than 40 characters.")]
    public string Name { get; set; }
    [StringLength(60, ErrorMessage = "Location can't be longer than 60 characters.")]
    public string Location { get; set; }
    public ICollection<Squad> Squads { get; set; }
    public bool isDeleted { get; set; }

}