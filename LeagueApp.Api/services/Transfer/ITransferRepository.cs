using System.Collections.Generic;
namespace LeagueApp.Api.Services
{
    public interface ITransferRepository
    {
        IEnumerable<Transfer> GetAllTransfers();

        Transfer GetTransfer(int id);
        Transfer AddTransfer(TransferCreationDto transfer);
        bool Save();

    }
}