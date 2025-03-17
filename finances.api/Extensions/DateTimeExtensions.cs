using System;

namespace finances2.api.Extensions {

    public static class DateTimeExtensions {

        public static string Description(this DateTime d) {
            return d.ToShortDateString();
        }

        public static int Period(this DateTime d) {
            return d.Month;
        }
    }
}
