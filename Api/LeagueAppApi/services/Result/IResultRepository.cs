
namespace LeagueAppApi.Services
{
    public interface IResultRepository
    {
        Fixture AddResult(Result result);
        bool Save();
        void DeleteResult(Fixture fixture);
        void UpdateResult(Result result);

    }
}