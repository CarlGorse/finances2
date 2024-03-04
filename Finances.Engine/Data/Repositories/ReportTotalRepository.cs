using Finances.Engine.Data.Models.ReportTotals;
using Finances.Engine.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace Finances.Engine.Data.Repositories {

    public class ReportTotalRepository : IReportTotalRepository {

        private readonly FinancesDbContext _FinancesDbContext;

        public ReportTotalRepository(FinancesDbContext financesDbContext) {
            _FinancesDbContext = financesDbContext ?? throw new ArgumentNullException(nameof(financesDbContext));
        }

        public IEnumerable<CategoryTotal> ReportTotalsByCategory(string parameters) { 
            return _FinancesDbContext.ReportTotalsByCategory
                .FromSqlRaw($"execute spReportTotalsByCategory {parameters}")
                .AsNoTracking();
        }

        public IEnumerable<AccountTotal> ReportTotalsByAccount(string parameters) {
            return _FinancesDbContext.ReportTotalsByAccount
                .FromSqlRaw($"execute spReportTotalsByAccount {parameters}")
                .AsNoTracking();
        }

        public IEnumerable<TransactionRunningTotal> ReportTransactionRunningTotals(string parameters) {
            return _FinancesDbContext.ReportTransactionRunningTotals
                .FromSqlRaw($"execute spReportTransactionRunningTotals {parameters}")
                .AsNoTracking();
        }

        public void SaveChanges() {
            _FinancesDbContext.SaveChanges();
        }
    }
}
