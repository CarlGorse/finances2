using System;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Dto.ReportService {

    public class GroupTotal {

        public int GroupId { get; set; }

        public ICollection<YearAndPeriodTotal> YearAndPeriodTotals { get; set; }

        public override bool Equals(object obj) {
            return (obj is GroupTotal groupTotal)
                && GroupId.Equals(groupTotal.GroupId)
                && YearAndPeriodTotals != null
                && YearAndPeriodTotals.SequenceEqual(groupTotal.YearAndPeriodTotals);
        }

        public override int GetHashCode() {
            return GroupId.GetHashCode();
        }
    }
}
