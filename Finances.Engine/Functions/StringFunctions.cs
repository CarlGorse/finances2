using System.Globalization;

namespace Finances.Engine.Functions {

    public static class StringFunctions {

        public static string ToTitleCase(this string thisString) {
            return CultureInfo.InvariantCulture.TextInfo.ToTitleCase(thisString.ToLower());
        }
    }
}
