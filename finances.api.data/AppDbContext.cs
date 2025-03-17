using finances2.api.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace finances2.api.Data {

    public class AppDbContext(DbContextOptions options) : DbContext(options), IFinancesDbContext {

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Group> CategoryGroups { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<Category>()
                .HasOne(c => c.Group)
                .WithMany(cg => cg.Categories);

            modelBuilder.Entity<Group>()
                .HasMany(cg => cg.Categories)
                .WithOne(c => c.Group);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Category);

            modelBuilder.Entity<YearAndPeriod>()
                .HasKey(yp => new { yp.Year, yp.Period });
        }

        public override ChangeTracker ChangeTracker => base.ChangeTracker;

        public override int SaveChanges() {

            var entries = base.ChangeTracker.Entries().Where(x => x.State == EntityState.Modified).Select(x => x.Entity);

            /*foreach (var e in entries) {
                ((Transaction)e).DateModified = DateTime.Now;
            }
            */

            return base.SaveChanges();
        }

        public void CancelChanges() {
            var entries = base.ChangeTracker.Entries().Where(x => x.State == EntityState.Modified).Select(x => x.Entity);

            foreach (var e in entries) {
                base.Entry(e).Reload();
            }
        }
    }
}
