using finances.api.Data.Models;
using finances.api.Logic;
using finances.api.Models;
using System.Collections.Generic;

namespace finances.api.Services {

    public interface IReportService {
        IEnumerable<AccountTotal> GetAccountTotals(int? startYear = null, int? startPeriod = null, int? endYear = null, int? endPeriod = null, int? accountId = null);
        IEnumerable<CategoryTotal> GetCategoryTotals(TransactionFilters transactionFilters);
        IEnumerable<Transaction> GetTransactionsWithRunningTotals(SearchCriteriaModel searchCriteria);

    }
}