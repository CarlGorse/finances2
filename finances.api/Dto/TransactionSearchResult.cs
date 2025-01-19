using finances.api.Data.Models;
using finances.api.Enums;
using System.Collections.Generic;

namespace finances.api.Dto {
    public class TransactionSearchResult {
        public ICollection<string> Errors = [];
        public int PageCount;
        public ServiceResult Result;
        public YearAndPeriodSearch SearchCriteria;
        public int TotalTransaxtions;
        public IEnumerable<Transaction> Transactions;
    }
}
