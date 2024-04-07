using finances.api.Dto;

namespace finances.api.Services {
    public interface ITransactionGetter {
        TransactionSearchResult Get(GetTransactionsParams parms);
    }
}