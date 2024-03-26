using finances.api.Data.Models;
using finances.api.Services;
using Moq;
using NUnit.Framework;

namespace finances.api.test.Services.SearchCriteriaServiceTests {

    public class ValidateTests {

        private YearAndPeriodService _yearAndPeriodService = new();

        [SetUp]
        public void SetUp() {
            _yearAndPeriodService = new YearAndPeriodService();
        }

        [Test]
        public void YearAndPeriodIsInvalid_ReturnsFalse() {

            var actual = _yearAndPeriodService.Validate(
                            yearAndPeriod: null, out _);

            Assert.That(actual, Is.False);
        }

        [Test]
        public void YearAndPeriodIsNull_ReturnsError() {

            var expected = new string[] { "YearAndPeriod is not initialised." };

            _yearAndPeriodService.Validate(
                            yearAndPeriod: null, out var errors);

            Assert.That(errors, Is.EquivalentTo(expected));
        }

        [TestCase(0)]
        [TestCase(-1)]
        public void YearIsNotGreaterThanZero_ReturnsError(int year) {

            var expected = new string[] { "Year must be greater than zero." };

            _yearAndPeriodService.Validate(
                    new YearAndPeriod(
                        year,
                        period: It.IsAny<int>()),
                        out var errors);

            Assert.That(errors, Is.EquivalentTo(expected));
        }

        [TestCase(0)]
        [TestCase(-1)]
        public void PeriodIsNotGreaterThanZero_ReturnsError(int period) {

            var expected = new string[] { "Period must be greater than zero." };

            _yearAndPeriodService.Validate(
                    new YearAndPeriod(
                        year: 1,
                        period),
                        out var errors);

            Assert.That(errors, Is.EquivalentTo(expected));
        }
    }
}