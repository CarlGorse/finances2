using finances2.api.Data.Models;

namespace finances.api.CategoryTotalsReport.Dto.CategoryTotalsReport {

    public class YearAndPeriodTotalDTO {

        public YearAndPeriod YearAndPeriod { get; set; }

        public decimal Total { get; set; }

        public override bool Equals(object other) {
            return other is YearAndPeriodTotalDTO yearAndPeriod
                    && YearAndPeriod.Equals(yearAndPeriod.YearAndPeriod)
                    && Total.Equals(yearAndPeriod.Total);
        }

        public override int GetHashCode() {
            return YearAndPeriod.GetHashCode();
        }
    }
}
