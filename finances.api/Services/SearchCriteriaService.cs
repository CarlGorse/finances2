using finances.api.Models;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Services {

    public class SearchCriteriaService() : ISearchCriteriaService {

        public bool ValidateSearchCriteria(SearchCriteriaModel searchCriteria, ICollection<string> validationErrors) {

            if (searchCriteria == null) {
                validationErrors.Add("Search criteria must be provided.");
                return false;
            }

            if (searchCriteria.PageNo == null) {
                validationErrors.Add($"{nameof(searchCriteria.PageNo)} must be provided.");
            }

            switch (searchCriteria.FilterType) {

                case SearchCriteriaModel.FilterTypes.YearAndPeriod:
                    if (searchCriteria.StartYear > searchCriteria.EndYear) {
                        validationErrors.Add("End Year must not be before Start Year.");
                    }
                    else if (searchCriteria.StartYear == searchCriteria.EndYear
                        && searchCriteria.StartPeriod > searchCriteria.EndPeriod) {
                        validationErrors.Add("End Year/Period must not be before Start Year/Period.");
                    }

                    break;

                case SearchCriteriaModel.FilterTypes.EffDate:
                    if ((searchCriteria.FilterType == SearchCriteriaModel.FilterTypes.EffDate) && (searchCriteria.StartEffDate > searchCriteria.EndEffDate)) {
                        validationErrors.Add("End Eff Date must not be before Start Eff Date.");
                    }

                    break;

                case SearchCriteriaModel.FilterTypes.TransactionId:
                    if (!(searchCriteria.TransactionId > 0)) {
                        validationErrors.Add("A transaction Id must be provided.");
                    }

                    break;
            }

            if (validationErrors.Any()) {
                return false;
            }

            return true;
        }
    }
}
