using finances.api.Data.Models;
using System;
using System.Linq;

namespace finances.api.Repositories {

    public interface ITransactionRepository : IEditableItemRepository<Transaction> {
        IQueryable<Transaction> Get(DateOnly startDate, DateOnly endDate);
    }
}