using finances.api.Data.Models;
using System.Collections.Generic;

namespace finances.api.Services {
    public interface IYearAndPeriodService {
        YearAndPeriod GetPreviousYearAndPeriod(YearAndPeriod yearAndPeriod);
        IEnumerable<YearAndPeriod> GetYearsAndPeriods(int startYear, int startPeriod, int endYear, int endPeriod);
    }
}