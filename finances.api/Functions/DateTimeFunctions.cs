using finances2.api.Logic;
using System;

namespace finances2.api.Functions {

    public static class DateTimeFunctions {

        public static IValidationResult IsAValidDateTime(string context, string effDateString) {

            if (!DateTime.TryParse(effDateString, out var effDate)) {
                return new ValidationResultFalse(context, $"EffDate {effDateString} is not a valid datetime");
            }

            if (effDate < new DateTime(2000, 1, 1)) {
                return new ValidationResultFalse(context, $"EffDate must be greater than 31/12/1999");
            }

            return new ValidationResultTrue();
        }

        public static IValidationResult IsAValidDateTime(string context, DateTime effDate) {
            return IsAValidDateTime(context, effDate.ToString());
        }

        public static IValidationResult IsAValidPeriod(string context, int period) {
            if (period < 0) {
                return new ValidationResultFalse(context, $"Period must not be less than 1");
            }

            if (period > 12) {
                return new ValidationResultFalse(context, $"Period must be less than 13");
            }

            return new ValidationResultTrue();

        }

        public static IValidationResult IsAValidYear(string context, string yearString) {
            if (!int.TryParse(yearString, out var year)) {
                return new ValidationResultFalse(context, $"Year ({yearString}) is not a valid integer");
            }

            if (year < 2000) {
                return new ValidationResultFalse(context, $"Year ({yearString}) must not be earlier than 2000");
            }

            if (year >= 2050) {
                return new ValidationResultFalse(context, $"Year ({yearString}) must be earlier than 2050");
            }

            return new ValidationResultTrue();
        }

        public static IValidationResult IsAValidYear(string context, int year) {
            return IsAValidYear(context, year.ToString());
        }

        public static int CalculateYearAndPeriod(int year, int period) {
            return (year * 12) + period - 1;
        }
    }
}