using Microsoft.EntityFrameworkCore;

namespace LeagueAppApi.Models
{
    public class LeagueAppContext : DbContext
    {
        public LeagueAppContext(DbContextOptions<LeagueAppContext> options) : base(options)
        {

        }
        public DbSet<Club> Clubs { get; set; }
    }
}