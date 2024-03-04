using Finances.Engine.Data.Models.ReportTotals;
using System.Collections.Generic;

namespace Finances.Engine.Data.Repositories.Interfaces {

    public interface IReportTotalRepository {
        IEnumerable<AccountTotal> ReportTotalsByAccount(string parameters);
        IEnumerable<CategoryTotal> ReportTotalsByCategory(string parameters);
        IEnumerable<TransactionRunningTotal> ReportTransactionRunningTotals(string parameters);
        void SaveChanges();
    }
}