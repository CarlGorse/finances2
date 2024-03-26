using finances.api.Data.Models;
using finances.api.Dto.ReportService;
using NUnit.Framework;

namespace finances.api.test.unit.Dto.ReportService.YearAndPeriodTotalTests {
    public class UnionTests {

        [Test]
        public void TwoTotalsWithSameYearPeriod_ReturnsOnTotal() {
            var a = new YearAndPeriodTotal { YearAndPeriod = new YearAndPeriod(year: 2000, period: 1), Total = 1 };
            var b = new YearAndPeriodTotal { YearAndPeriod = new YearAndPeriod(year: 2000, period: 1), Total = 2 };

        }
    }
}
