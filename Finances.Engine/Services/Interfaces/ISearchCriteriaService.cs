using Finances.Engine.Data.Models;
using Finances.Engine.Logic;
using Finances.Engine.Models;
using System.Collections.Generic;

namespace Finances.Engine.Services {
    public interface ISearchCriteriaService {
        IEnumerable<(int Year, int Period)> CalculateYearsAndPeriodsBetweenStartAndEnd(int startYear, int startPeriod, int endYear, int endPeriod);
        IEnumerable<(int Year, int Period)> CalculateYearsAndPeriodsWithInSearchCriteria(SearchCriteriaModel searchCriteria);
        SearchCriteriaModel CreateDefaultModelSearchCriteria(int periodsToDeductFromStart = 0, int periodsToAddToEnd = 0);
        TransactionFilters CreateTransactionFiltersFromSearchCriteria(SearchCriteriaModel searchCriteria);
        bool ValidateSearchCriteria(SearchCriteriaModel searchCriteria, List<string> validationErrors);
    }
}