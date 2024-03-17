using System.Collections.Generic;
using System.Linq;

namespace finances.api {
    public static class Constants {
        public static IReadOnlyCollection<int> SearchableYears => Enumerable.Range(2019, 6).ToList();
        public static IReadOnlyCollection<int> AddEditableYears => Enumerable.Range(2019, 6).ToList();
    }
}
