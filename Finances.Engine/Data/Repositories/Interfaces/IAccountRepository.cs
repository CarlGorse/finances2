using Finances.Engine.Data.Models;
using System.Collections.Generic;

namespace Finances.Engine.Data.Repositories.Interfaces {
    public interface IAccountRepository {
        bool Any(int accountId);
        Account Get(int accountId);
        IEnumerable<Account> Accounts { get; }
    }
}