using finances.api.CategoryTotalsReport.Dto;
using finances2.api.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace finances2.api.Repositories {

    public interface ITransactionRepository : IEditableItemRepository<Transaction> {
        IQueryable<Transaction> Get(DateOnly startDate, DateOnly endDate);
        ICollection<Transaction> Get(int accountId, YearAndPeriodSearchDTO yearAndPeriodSearch);
    }
}