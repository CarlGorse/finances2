using Finances.Engine.Data.Interfaces;
using Finances.Engine.Data.Models;
using Finances.Engine.Data.Repositories.Interfaces;
using Finances.Engine.Interfaces.Dtos;
using System.Collections.Generic;
using System.Linq;

namespace Finances.Engine.Data.Repositories {

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
