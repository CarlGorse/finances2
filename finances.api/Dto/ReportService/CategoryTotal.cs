using System;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Dto.ReportService {

    public class CategoryTotal {

        public int CategoryId { get; set; }

        public ICollection<YearAndPeriodTotal> YearAndPeriodTotals { get; set; }

        public override bool Equals(object obj) {
            return (obj is CategoryTotal categoryTotal)
                && CategoryId.Equals(categoryTotal.CategoryId)
                && YearAndPeriodTotals != null
                && YearAndPeriodTotals.SequenceEqual(categoryTotal.YearAndPeriodTotals);
        }

        public override int GetHashCode() {
            return CategoryId.GetHashCode();
        }
    }
}
