using finances.api.Data.Models;
using finances.api.Services;
using NUnit.Framework;

namespace finances.api.test.Services.SearchCriteriaServiceTests {

    public class GetPreviousYearAndPeriodTests {

        private YearAndPeriodService _yearAndPeriodService = new();

        [SetUp]
        public void SetUp() {
            _yearAndPeriodService = new YearAndPeriodService();
        }

        [Test]
        public void PeriodIsOne_ReturnsPreviousYearMonthIsTwelve() {

            var actual = _yearAndPeriodService.GetPreviousYearAndPeriod(
                            yearAndPeriod: new YearAndPeriod(2024, period: 1));

            var expected = new YearAndPeriod(2023, 12);

            var isEqualToExpected = actual.Equals(expected);

            Assert.That(isEqualToExpected, Is.True);
        }

        [TestCase(2)]
        [TestCase(12)]
        public void PeriodIsNotOne_ReturnsSameYearPreviousPeriod(int period) {

            var actual = _yearAndPeriodService.GetPreviousYearAndPeriod(
                            yearAndPeriod: new YearAndPeriod(2024, period));

            var expected = new YearAndPeriod(2024, period - 1);

            var isEqualToExpected = actual.Equals(expected);

            Assert.That(isEqualToExpected, Is.True);
        }
    }
}