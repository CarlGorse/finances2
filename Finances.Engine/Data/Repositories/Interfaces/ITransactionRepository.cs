using Finances.Engine.Data.Models;
using Finances.Engine.Logic;
using System.Collections.Generic;

namespace Finances.Engine.Data.Repositories.Interfaces {

    public interface ITransactionRepository : IEditableItemRepository<Transaction> {
        IEnumerable<Transaction> GetMatchingWageTransactions(Transaction transaction);
        decimal GetTotalCreditForWageTransaction(Transaction transaction);
        IEnumerable<Transaction> GetTransactionsByFilters(TransactionFilters transactionFilters);
        void SetWageTotalForEffDate(Transaction transaction);
    }
}