using finances2.api.Dto;

namespace finances2.api.Services {
    public interface ITransactionGetter {
        TransactionSearchResult Get(GetTransactionsParams parms);
    }
}