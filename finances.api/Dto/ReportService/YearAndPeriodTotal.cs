using finances.api.Data.Models;

namespace finances.api.Dto.ReportService {

    public class YearAndPeriodTotal {

        public YearAndPeriod YearAndPeriod { get; set; }

        public decimal Total { get; set; }
        public decimal YTDTotal { get; set; }

        public override bool Equals(object other) {
            return (other is YearAndPeriodTotal yearAndPeriod)
                    && YearAndPeriod.Equals(yearAndPeriod.YearAndPeriod)
                    && Total.Equals(yearAndPeriod.Total);
        }

        public override int GetHashCode() {
            return YearAndPeriod.GetHashCode();
        }
    }
}
