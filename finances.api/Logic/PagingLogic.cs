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

            if (pageSize <= 0) {
                throw new InvalidOperationException("Page size must be greater than zero.");
            }

            if (pageNo <= 0) {
                throw new InvalidOperationException("Page number must be greater than zero.");
            }

            return items.Skip(Math.Max((pageNo - 1) * pageSize, 0)).Take(pageSize).ToList();
        }
    }
}
