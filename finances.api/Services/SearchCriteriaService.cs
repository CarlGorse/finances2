using finances.api.Dto;
using System.Collections.Generic;

namespace finances.api.Services {

    public class SearchCriteriaService() : ISearchCriteriaService {

        public void ValidateSearchCriteria(SearchCriteria searchCriteria, ICollection<string> validationErrors) {

            if (searchCriteria == null) {
                validationErrors.Add("Search criteria must be provided.");
                return;
            }

            if (searchCriteria.StartYear > searchCriteria.EndYear) {
                validationErrors.Add("End Year must not be before Start Year.");
            }
            else if (searchCriteria.StartYear == searchCriteria.EndYear
                && searchCriteria.StartPeriod > searchCriteria.EndPeriod) {
                validationErrors.Add("End Year/Period must not be before Start Year/Period.");
            }
        }
    }
}
