using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Season
{
    public int Id { get; set; }
    [Required]
    [StringLength(40, ErrorMessage = "Name can't be longer than 40 characters.")]
    public string Name { get; set; }
    public League League { get; set; }
    public bool Active { get; set; }
    public ICollection<Fixture> Fixtures { get; set; }
    public bool isDeleted { get; set; }
}