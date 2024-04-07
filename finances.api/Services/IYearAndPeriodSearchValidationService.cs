using finances.api.Dto;
using System.Collections.Generic;

namespace finances.api.Services {
    public interface IYearAndPeriodSearchValidationService {
        void Validate(YearAndPeriodSearch yearAndPeriodSearch, ICollection<string> validationErrors);
    }
}