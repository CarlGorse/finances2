using System;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.CategoryTotalsReport.Dto.CategoryTotalsReport {

    public class CategoryTotalDTO {

        public int CategoryId { get; set; }

        public ICollection<YearAndPeriodTotalDTO> YearAndPeriodTotals { get; set; }

        public override bool Equals(object obj) {
            return obj is CategoryTotalDTO categoryTotal
                && CategoryId.Equals(categoryTotal.CategoryId)
                && YearAndPeriodTotals != null
                && YearAndPeriodTotals.SequenceEqual(categoryTotal.YearAndPeriodTotals);
        }

        public override int GetHashCode() {
            return CategoryId.GetHashCode();
        }
    }
}
