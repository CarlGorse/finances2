using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Dtos;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Repositories {

    public class AccountRepository : GettableItemRepository<Account>, IAccountRepository {

        private readonly IFinancesDbContext _DbContext;

        public AccountRepository(IFinancesDbContext dbContext, IItemProperties<Account> itemProperties) : base(itemProperties) {
            _DbContext = dbContext;
        }

        public IEnumerable<Account> Accounts => Items;

        protected override IQueryable<Account> ItemsQuery() {
            return _DbContext.Accounts;
        }
    }
}
