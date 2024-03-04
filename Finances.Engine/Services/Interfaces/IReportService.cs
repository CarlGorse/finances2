using Finances.Engine.Data.Models.ReportTotals;
using Finances.Engine.Logic;
using System.Collections.Generic;

namespace Finances.Engine.Services.Interfaces {

    public interface IReportService {
        IEnumerable<AccountTotal> GetAccountTotals(int? startYear = null, int? startPeriod = null, int? endYear = null, int? endPeriod = null, int? accountId = null);
        IEnumerable<CategoryTotal> GetCategoryTotals(TransactionFilters transactionFilters);
        IEnumerable<TransactionRunningTotal> GetTransactionRunningTotals(TransactionFilters transactionFilters);

    }
}