using Microsoft.EntityFrameworkCore;

namespace LeagueAppApi.Models
{
    public class LeagueAppContext : DbContext
    {
        public LeagueAppContext(DbContextOptions<LeagueAppContext> options) : base(options)
        {

        }
        public DbSet<Club> Clubs { get; set; }
        public DbSet<Squad> Squads { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Transfer> Transfers { get; set; }
        public DbSet<League> Leagues { get; set; }
    }
}