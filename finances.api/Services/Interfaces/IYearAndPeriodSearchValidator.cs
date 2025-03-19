using finances.api.CategoryTotalsReport.Dto;
using System.Collections.Generic;

namespace finances2.api.Services {
    public interface IYearAndPeriodSearchValidationService {
        void Validate(YearAndPeriodSearchDTO yearAndPeriodSearch, ICollection<string> validationErrors);
    }
}