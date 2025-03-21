using finances2.api.Data.Models;
using finances2.api.Enums;
using System.Collections.Generic;

namespace finances.api.CategoryTotalsReport.Dto {
    public class TransactionSearchResultDTO {
        public ICollection<string> Errors = [];
        public int PageCount;
        public int PageSize;
        public ServiceResult Result;
        public YearAndPeriodSearchDTO SearchCriteria;
        public int TotalTransactions;
        public IEnumerable<Transaction> Transactions;
    }
}
