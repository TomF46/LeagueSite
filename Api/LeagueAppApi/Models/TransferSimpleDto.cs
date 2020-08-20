public class TransferSimpleDto
{
    public int Id { get; set; }
    public int PlayerId { get; set; }
    public string PlayerDisplayName { get; set; }

    public int FromSquadId { get; set; }
    public string FromSquadDisplayName { get; set; }
    public int ToSquadId { get; set; }
    public string ToSquadDisplayName { get; set; }

}