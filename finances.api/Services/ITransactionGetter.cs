using finances.api.Dto;

namespace finances.api.Services {
    public interface ITransactionGetter {
        TransactionSearchResult Get(
            int accountId,
            YearAndPeriodSearch yearAndPeriodSearch,
            int pageNo = 0,
            bool includeWageTotals = false,
            bool includeRunningTotals = false);
    }
}