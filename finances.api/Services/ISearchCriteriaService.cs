using finances.api.Dto;
using System.Collections.Generic;

namespace finances.api.Services {
    public interface ISearchCriteriaService {
        void ValidateSearchCriteria(SearchCriteria searchCriteria, ICollection<string> validationErrors);
    }
}