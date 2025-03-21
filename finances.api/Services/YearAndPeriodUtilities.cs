using finances.api.Services.Interfaces;
using finances2.api.Data.Models;
using System.Collections.Generic;

namespace finances.api.Services {

    public class YearAndPeriodUtilities() : IYearAndPeriodUtiltities {

        public IEnumerable<YearAndPeriod> GetYearsAndPeriods(
            int startYear, int startPeriod, int endYear, int endPeriod) {

            List<YearAndPeriod> yearsAndPeriods = [];

            var periodCountAtStart = GetPeriodCount(startYear, startPeriod);
            var periodCountAtEnd = GetPeriodCount(endYear, endPeriod);

            for (var periodCount = periodCountAtStart; periodCount <= periodCountAtEnd; periodCount++) {
                var year = (int)System.Math.Floor((decimal)(periodCount - 1) / 12);
                var period = periodCount - year * 12;
                yearsAndPeriods.Add(new YearAndPeriod(year, period));
            }

            return yearsAndPeriods;
        }

        private static int GetPeriodCount(int year, int period) {
            return year * 12 + period;
        }

        public YearAndPeriod GetPreviousYearAndPeriod(YearAndPeriod yearAndPeriod) {
            if (yearAndPeriod.Period == 1) {
                return new YearAndPeriod(yearAndPeriod.Year - 1, 12);
            }
            else {
                return new YearAndPeriod(yearAndPeriod.Year, yearAndPeriod.Period - 1);
            }
        }

        public bool Validate(YearAndPeriod yearAndPeriod, out ICollection<string> errors) {

            errors = [];

            if (yearAndPeriod == null) {
                errors.Add("YearAndPeriod is not initialised.");
                return false;
            }

            if (yearAndPeriod.Year <= 0) {
                errors.Add("Year must be greater than zero.");
                return false;
            }

            if (yearAndPeriod.Period <= 0) {
                errors.Add("Period must be greater than zero.");
                return false;
            }

            return true;
        }
    }
}
