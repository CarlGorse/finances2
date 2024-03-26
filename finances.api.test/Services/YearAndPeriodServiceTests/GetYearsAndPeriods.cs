using finances.api.Data.Models;
using finances.api.Services;
using NUnit.Framework;

namespace finances.api.test.unit.Services.YearAndPeriodServiceTests {
    internal class GetYearsAndPeriods {

        private IYearAndPeriodService _yearAndPeriodService;

        [SetUp]
        public void SetUp() {
            _yearAndPeriodService = new YearAndPeriodService();
        }

        [Test]
        public void StartAndEndYearsMatchAndPeriodsMatch_ReturnsSingleYEarAndPeriod() {

            var expected = new YearAndPeriod[] {
                new YearAndPeriod(2001, 3),
                new YearAndPeriod(2001, 4)
            };

            var actual = _yearAndPeriodService.GetYearsAndPeriods(
                startYear: 2001,
                startPeriod: 3,
                endYear: 2001,
                endPeriod: 4
            );

            Assert.That(actual, Is.EqualTo(expected));
        }

        [Test]
        public void StartAndEndYearMatchAndPeriodsDiffer_ReturnsExpected() {

            var expected = new YearAndPeriod[] {
                new YearAndPeriod(2001, 3),
                new YearAndPeriod(2001, 4)
            };

            var actual = _yearAndPeriodService.GetYearsAndPeriods(
                startYear: 2001,
                startPeriod: 3,
                endYear: 2001,
                endPeriod: 4
            );

            Assert.That(actual, Is.EqualTo(expected));
        }

        [Test]
        public void StartAndEndYearsDiffer_ReturnsExpected() {

            var expected = new YearAndPeriod[] {
                new YearAndPeriod(2001, 12),
                new YearAndPeriod(2002, 1)
            };

            var actual = _yearAndPeriodService.GetYearsAndPeriods(
                startYear: 2001,
                startPeriod: 12,
                endYear: 2002,
                endPeriod: 1
            );

            Assert.That(actual, Is.EqualTo(expected));
        }
    }
}
