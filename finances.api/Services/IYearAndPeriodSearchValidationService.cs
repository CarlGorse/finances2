using finances2.api.Dto;
using System.Collections.Generic;

namespace finances2.api.Services {
    public interface IYearAndPeriodSearchValidationService {
        void Validate(YearAndPeriodSearch yearAndPeriodSearch, ICollection<string> validationErrors);
    }
}