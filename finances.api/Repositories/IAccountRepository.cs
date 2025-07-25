﻿using finances2.api.Data.Models;
using System.Collections.Generic;

namespace finances2.api.Repositories {
    public interface IAccountRepository {
        bool Any(int accountId);
        Account Get(int accountId);
        IEnumerable<Account> Accounts { get; }
    }
}