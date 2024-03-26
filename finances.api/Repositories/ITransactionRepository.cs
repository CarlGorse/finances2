using finances.api.Data.Models;
using finances.api.Dto;
using System.Linq;

namespace finances.api.Repositories {

    public interface ITransactionRepository : IEditableItemRepository<Transaction> {
        IQueryable<Transaction> Get(SearchCriteria searchCriteria);
    }
}