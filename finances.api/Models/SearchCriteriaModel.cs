using finances.api.Data.Models;
using finances.api.Functions;
using System;
using System.Collections.Generic;

namespace finances.api.Models {

    public class SearchCriteriaModel {

        public enum FilterTypes {
            YearAndPeriod = 0,
            EffDate = 1,
            TransactionId = 2
        }

        public SearchCriteriaModel() { }

        public SearchCriteriaModel(IEnumerable<Account> accounts, IEnumerable<Category> categories) {
            Accounts = accounts;
            Categories = categories;
        }

        public int AccountId { get; set; }
        public IEnumerable<Account> Accounts { get; private set; }
        public IEnumerable<Category> Categories { get; private set; }
        public int CategoryId { get; set; }
        public int TransactionId { get; set; }
        public int StartYear { get; set; }
        public int StartPeriod { get; set; }
        public int EndYear { get; set; }
        public int EndPeriod { get; set; }
        public FilterTypes FilterType { get; set; }

        public DateTime StartEffDate { get; set; }

        public DateTime EndEffDate { get; set; }

        public int StartYearAndPeriod => DateTimeFunctions.CalculateYearAndPeriod(StartYear, StartPeriod);

        public int EndYearAndPeriod => DateTimeFunctions.CalculateYearAndPeriod(EndYear, EndPeriod);

    }
}
