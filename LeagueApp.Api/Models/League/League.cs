using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class League
{
    public int Id { get; set; }
    [Required]
    [StringLength(40, ErrorMessage = "Name can't be longer than 40 characters.")]
    public string Name { get; set; }
    public ICollection<Squad> ParticipantSquads { get; set; }
    public ICollection<Season> Seasons { get; set; }
    public bool isDeleted { get; set; }


}