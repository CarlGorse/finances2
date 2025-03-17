using finances.api.Dto.Services.CategoryTotalsReportCreator;
using System;
using System.Collections.Generic;
using System.Linq;

namespace finances2.api.Dto.Services.CategoryTotalsReportCreator {

    public class CategoryTotal {

        public int CategoryId { get; set; }

        public ICollection<YearAndPeriodTotal> YearAndPeriodTotals { get; set; }

        public override bool Equals(object obj) {
            return obj is CategoryTotal categoryTotal
                && CategoryId.Equals(categoryTotal.CategoryId)
                && YearAndPeriodTotals != null
                && YearAndPeriodTotals.SequenceEqual(categoryTotal.YearAndPeriodTotals);
        }

        public override int GetHashCode() {
            return CategoryId.GetHashCode();
        }
    }
}
