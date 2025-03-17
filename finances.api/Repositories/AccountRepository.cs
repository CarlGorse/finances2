using finances2.api.Data;
using finances2.api.Data.Models;
using System.Collections.Generic;
using System.Linq;

namespace finances2.api.Repositories {

    public class AccountRepository(IFinancesDbContext dbContext) : GettableItemRepository<Account>(), IAccountRepository {

        private readonly IFinancesDbContext _DbContext = dbContext;

        public IEnumerable<Account> Accounts => Items;

        protected override IQueryable<Account> ItemsQuery() {
            return _DbContext.Accounts;
        }
    }
}
