using Finances.Engine.Data.Models;
using Finances.Engine.Models;
using System.Collections.Generic;

namespace Finances.App.WebApp.Models.Views.Transactions {

    public class TransactionsIndexViewModel {

        public IEnumerable<Account> Accounts { get; set; }
        public IEnumerable<Category> Categories { get; set; }
        public IEnumerable<CategoryGroup> CategoryGroups { get; set; }
        public IEnumerable<(int Year, int Period)> YearsAndPeriods { get; set; }
        public SearchCriteriaModel SearchCriteriaModel { get; set; }
    }
}
