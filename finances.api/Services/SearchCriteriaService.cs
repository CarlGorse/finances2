using finances.api.Models;
using System.Collections.Generic;

namespace finances.api.Services {

    public class SearchCriteriaService() : ISearchCriteriaService {

        public bool ValidateSearchCriteria(SearchCriteriaModel searchCriteria, ICollection<string> validationErrors) {

            if (searchCriteria == null) {
                validationErrors.Add("Search criteria must be provided.");
                return false;
            }

            if (searchCriteria.PageNo <= 0) {
                validationErrors.Add($"{nameof(searchCriteria.PageNo)} must be greter than zero.");
            }

            if (searchCriteria.StartYear > searchCriteria.EndYear) {
                validationErrors.Add("End Year must not be before Start Year.");
            }
            else if (searchCriteria.StartYear == searchCriteria.EndYear
                && searchCriteria.StartPeriod > searchCriteria.EndPeriod) {
                validationErrors.Add("End Year/Period must not be before Start Year/Period.");
            }

            if (validationErrors.Count > 0) {
                return false;
            }

            return true;
        }
    }
}
