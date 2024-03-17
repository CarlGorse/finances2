using finances.api.Data.Models;
using System.Collections.Generic;

namespace finances.api.Repositories {

    public interface IReportTotalRepository {
        IEnumerable<AccountTotal> ReportTotalsByAccount(string parameters);
        IEnumerable<CategoryTotal> ReportTotalsByCategory(string parameters);
        IEnumerable<TransactionRunningTotal> ReportTransactionRunningTotals(string parameters);
        void SaveChanges();
    }
}