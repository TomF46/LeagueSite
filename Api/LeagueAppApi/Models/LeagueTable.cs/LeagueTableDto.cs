using System.Collections.Generic;

public class LeagueTableDto
{
    public int seasonId { get; set; }
    public string seasonDisplayName { get; set; }
    public ICollection<LeagueTableRowDto> rows { get; set; }
}