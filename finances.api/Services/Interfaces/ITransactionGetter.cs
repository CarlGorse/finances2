using finances.api.CategoryTotalsReport.Dto;

namespace finances.api.Services.Interfaces {
    public interface ITransactionGetter {
        TransactionSearchResultDTO Get(GetTransactionsParamsDTO parms);
    }
}