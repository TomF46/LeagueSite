using System.Collections.Generic;
namespace LeagueAppApi.Services
{
    public interface IFixtureRepository
    {
        IEnumerable<Fixture> GetAllFixtures();

        Fixture GetFixture(int id);
        Fixture AddFixture(FixtureCreationDto fixture);
        bool Save();
        void DeleteFixture(Fixture fixture);
        void UpdateFixture(FixtureUpdateDto fixture);

    }
}