using finances.api.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq;

namespace finances.api.Data {

    public class FinancesDbContext(DbContextOptions<FinancesDbContext> options) : DbContext(options), IFinancesDbContext {

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<CategoryGroup> CategoryGroups { get; set; }
        public DbSet<AccountTotal> ReportTotalsByAccount { get; set; }
        public DbSet<CategoryTotal> ReportTotalsByCategory { get; set; }
        public DbSet<TransactionRunningTotal> ReportTransactionRunningTotals { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<Category>()
                .HasOne(c => c.Group)
                .WithMany(cg => cg.Categories);

            modelBuilder.Entity<CategoryGroup>()
                .HasMany(cg => cg.Categories)
                .WithOne(c => c.Group);

            modelBuilder.Entity<CategoryTotal>()
                .HasKey(rt => new { rt.Year, rt.Period, rt.CategoryId });

            modelBuilder.Entity<AccountTotal>()
                .HasKey(rt => new { rt.Year, rt.Period, rt.AccountId });

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
