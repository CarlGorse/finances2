using finances2.api.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace finances2.api.Data {

    public interface IFinancesDbContext {
        DbSet<Account> Accounts { get; set; }
        DbSet<Category> Categories { get; set; }
        DbSet<Group> CategoryGroups { get; set; }
        ChangeTracker ChangeTracker { get; }
        DbSet<Transaction> Transactions { get; set; }

        void CancelChanges();
        int SaveChanges();
    }
}