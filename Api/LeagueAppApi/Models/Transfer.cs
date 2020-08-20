using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Transfer
{
    public int Id { get; set; }
    public Player Player { get; set; }
    public Squad FromSquad { get; set; }
    public Squad ToSquad { get; set; }
    [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public System.DateTime DateCreated { get; set; }
}