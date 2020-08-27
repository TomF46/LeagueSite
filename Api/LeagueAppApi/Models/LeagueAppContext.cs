using Microsoft.EntityFrameworkCore;

namespace LeagueAppApi.Models
{
    public class LeagueAppContext : DbContext
    {
        public LeagueAppContext(DbContextOptions<LeagueAppContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GoalRecord>().HasKey(gr => new { gr.PlayerId, gr.FixtureId });
            modelBuilder.Entity<GoalRecord>()
            .HasOne<Player>(gr => gr.Player)
            .WithMany(g => g.Goals)
            .HasForeignKey(gr => gr.PlayerId);

            modelBuilder.Entity<GoalRecord>()
                .HasOne<Fixture>(gr => gr.Fixture)
                .WithMany(f => f.Goals)
                .HasForeignKey(gr => gr.FixtureId);
        }


        public DbSet<Club> Clubs { get; set; }
        public DbSet<Squad> Squads { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Transfer> Transfers { get; set; }
        public DbSet<League> Leagues { get; set; }
        public DbSet<Season> Seasons { get; set; }
        public DbSet<Fixture> Fixtures { get; set; }
        public DbSet<GoalRecord> GoalRecords { get; set; }
    }
}