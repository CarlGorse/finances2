﻿namespace finances2.api.Extensions {

    public static class IntExtensions {

        public static string FormatXDigits(this int number, int numberDigits) {
            return number.ToString(new string('0', numberDigits));
        }
    }
}
