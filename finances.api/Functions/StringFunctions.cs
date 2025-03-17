using System.Globalization;

namespace finances2.api.Functions {

    public static class StringFunctions {

        public static string ToTitleCase(this string thisString) {
            return CultureInfo.InvariantCulture.TextInfo.ToTitleCase(thisString.ToLower());
        }
    }
}
