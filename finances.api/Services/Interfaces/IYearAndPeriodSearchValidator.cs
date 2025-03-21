using finances.api.CategoryTotalsReport.Dto;
using System.Collections.Generic;

namespace finances.api.Services.Interfaces {
    public interface IYearAndPeriodSearchValidator {
        void Validate(YearAndPeriodSearchDTO yearAndPeriodSearch, ICollection<string> validationErrors);
    }
}