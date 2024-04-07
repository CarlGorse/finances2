using finances.api.Data.Models;
using finances.api.Dto;
using System;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Repositories {

    public interface ITransactionRepository : IEditableItemRepository<Transaction> {
        IQueryable<Transaction> Get(DateOnly startDate, DateOnly endDate);
        ICollection<Transaction> Get(int accountId, YearAndPeriodSearch yearAndPeriodSearch);
    }
}