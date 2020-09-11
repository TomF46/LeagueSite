namespace LeagueApp.Api.Services
{
    public class TransferCreationDto
    {
        public int PlayerId { get; set; }
        public int FromSquadId { get; set; }
        public int ToSquadId { get; set; }
    }
}