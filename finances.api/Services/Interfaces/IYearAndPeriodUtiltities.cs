using finances2.api.Data.Models;
using System.Collections.Generic;

namespace finances.api.Services.Interfaces {
    public interface IYearAndPeriodUtiltities {
        YearAndPeriod GetPreviousYearAndPeriod(YearAndPeriod yearAndPeriod);
        IEnumerable<YearAndPeriod> GetYearsAndPeriods(int startYear, int startPeriod, int endYear, int endPeriod);
    }
}