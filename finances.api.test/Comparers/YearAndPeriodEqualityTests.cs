using finances.api.Data.Models;
using NUnit.Framework;

namespace finances.api.test.Comparers {
    public class YearAndPeriodEqualityTests {

        [Test]
        public void YearsAndPeriodsMatch_ReturnsTrue() {
            Assert.That(
                new YearAndPeriod(year: 2024, period: 1)
                .Equals(
                    new YearAndPeriod(year: 2024, period: 1)),
                Is.True);
        }

        [Test]
        public void YearsAreDifferentAndPeriodsMatch_ReturnsTrue() {
            Assert.That(
                new YearAndPeriod(year: 2024, period: 1)
                .Equals(
                    new YearAndPeriod(year: 2023, period: 1)),
                Is.False);
        }

        [Test]
        public void YearsMatchAndPeriodsAreDifferent_ReturnsTrue() {
            Assert.That(
                new YearAndPeriod(year: 2024, period: 1)
                .Equals(
                    new YearAndPeriod(year: 2024, period: 2)),
                Is.False);
        }
    }
}
