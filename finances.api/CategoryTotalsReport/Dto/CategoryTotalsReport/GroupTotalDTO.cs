using System;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.CategoryTotalsReport.Dto.CategoryTotalsReport {

    public class GroupTotalDTO {

        public int GroupId { get; set; }

        public ICollection<YearAndPeriodTotalDTO> YearAndPeriodTotals { get; set; }

        public override bool Equals(object obj) {
            return obj is GroupTotalDTO groupTotal
                && GroupId.Equals(groupTotal.GroupId)
                && YearAndPeriodTotals != null
                && YearAndPeriodTotals.SequenceEqual(groupTotal.YearAndPeriodTotals);
        }

        public override int GetHashCode() {
            return GroupId.GetHashCode();
        }
    }
}
