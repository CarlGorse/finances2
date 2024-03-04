using Finances.Engine.Data.Models;
using Finances.Engine.Data.Models.ReportTotals;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Finances.Engine.Data.Interfaces {

    public interface IFinancesDbContext {
        DbSet<Account> Accounts { get; set; }
        DbSet<Category> Categories { get; set; }
        DbSet<CategoryGroup> CategoryGroups { get; set; }
        ChangeTracker ChangeTracker { get; }
        DbSet<AccountTotal> ReportTotalsByAccount { get; set; }
        DbSet<CategoryTotal> ReportTotalsByCategory { get; set; }
        DbSet<TransactionRunningTotal> ReportTransactionRunningTotals { get; set; }
        DbSet<Transaction> Transactions { get; set; }

        void CancelChanges();
        int SaveChanges();
    }
}