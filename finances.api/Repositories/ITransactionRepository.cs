using finances.api.Data.Models;
using finances.api.Logic;
using System.Collections.Generic;

namespace finances.api.Repositories {

    public interface ITransactionRepository : IEditableItemRepository<Transaction> {
        IEnumerable<Transaction> GetMatchingWageTransactions(Transaction transaction);
        decimal GetTotalCreditForWageTransaction(Transaction transaction);
        IEnumerable<Transaction> GetTransactionsByFilters(TransactionFilters transactionFilters);
        void SetWageTotalForEffDate(Transaction transaction);
    }
}