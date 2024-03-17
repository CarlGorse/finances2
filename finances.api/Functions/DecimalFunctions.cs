using finances.api.Logic;
using System;
using System.Linq;

namespace finances.api.Functions {

    public static class DecimalFunctions {

        public static IValidationResult IsValidCurrency(string context, string currencyType, decimal value) {
            if (value < 0) {
                return new ValidationResultFalse(context, $"{currencyType} must not be less than 0");
            }

            if (NumberOfDecimalPoints(value) > 1) {
                return new ValidationResultFalse(context, $"{currencyType} has more than one decimal point");
            }

            value = TrimDecimalPlaces(value);

            if (NumberOfDecimalPlaces(value) > 2) {
                return new ValidationResultFalse(context, $"{currencyType} has more than two decimal places");
            }

            return new ValidationResultTrue();
        }

        private static int NumberOfDecimalPoints(decimal value) {
            return value.ToString().ToCharArray().Count(x => x == '.');
        }

        private static int NumberOfDecimalPlaces(decimal value) {
            var decimalPlacePos = value.ToString().IndexOf(".");
            if (decimalPlacePos < 0) {
                return 0;
            }

            return value.ToString().Length - decimalPlacePos - 1;
        }

        private static decimal TrimDecimalPlaces(decimal value) {
            if (NumberOfDecimalPlaces(value) == 0) {
                return value;
            }

            return Convert.ToDecimal(value.ToString().TrimEnd('0'));
        }
    }
}
