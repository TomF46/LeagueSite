using LeagueApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LeagueApp.Tests
{
    public class InMemoryDbContextFactory
    {
        public LeagueAppContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<LeagueAppContext>()
                            .UseInMemoryDatabase(databaseName: "InMemoryArticleDatabase")
                            .Options;
            var dbContext = new LeagueAppContext(options);

            return dbContext;
        }
    }
}