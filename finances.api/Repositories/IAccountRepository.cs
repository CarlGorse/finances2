using finances.api.Data.Models;
using System.Collections.Generic;

namespace finances.api.Repositories {
    public interface IAccountRepository {
        bool Any(int accountId);
        Account Get(int accountId);
        IEnumerable<Account> Accounts { get; }
    }
}