using finances.api.Models;
using System.Collections.Generic;

namespace finances.api.Services {
    public interface ISearchCriteriaService {
        bool ValidateSearchCriteria(SearchCriteriaModel searchCriteria, ICollection<string> validationErrors);
    }
}