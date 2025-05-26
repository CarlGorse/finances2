using System;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Logic {
    public static class PagingLogic {

        public static int GetPageCount(int itemCount, int pageSize) {

            if (itemCount <= 0 || pageSize <= 0) {
                return 1;
            }

            return (int)Math.Ceiling((decimal)(Math.Max(itemCount - 1, 0) / pageSize)) + 1;
        }

        public static IReadOnlyCollection<T> GetPagedItems<T>(ICollection<T> items, int pageSize, int pageNo) {

            ArgumentNullException.ThrowIfNull(items);

            if (items.Count == 0 || pageSize <= 0 || pageNo <= 0) {
                return items.ToList();
            }

            return items.Skip(Math.Max((pageNo - 1) * pageSize, 0)).Take(pageSize).ToList();
        }
    }
}
