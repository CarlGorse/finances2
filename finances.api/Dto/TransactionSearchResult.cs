using finances2.api.Data.Models;
using finances2.api.Enums;
using System.Collections.Generic;

namespace finances2.api.Dto {
    public class TransactionSearchResult {
        public ICollection<string> Errors = [];
        public int PageCount;
        public ServiceResult Result;
        public YearAndPeriodSearch SearchCriteria;
        public int TotalTransaxtions;
        public IEnumerable<Transaction> Transactions;
    }
}
