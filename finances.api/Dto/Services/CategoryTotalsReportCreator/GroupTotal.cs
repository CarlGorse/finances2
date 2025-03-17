using finances.api.Dto.Services.CategoryTotalsReportCreator;
using System;
using System.Collections.Generic;
using System.Linq;

namespace finances2.api.Dto.Services.CategoryTotalsReportCreator {

    public class GroupTotal {

        public int GroupId { get; set; }

        public ICollection<YearAndPeriodTotal> YearAndPeriodTotals { get; set; }

        public override bool Equals(object obj) {
            return obj is GroupTotal groupTotal
                && GroupId.Equals(groupTotal.GroupId)
                && YearAndPeriodTotals != null
                && YearAndPeriodTotals.SequenceEqual(groupTotal.YearAndPeriodTotals);
        }

        public override int GetHashCode() {
            return GroupId.GetHashCode();
        }
    }
}
