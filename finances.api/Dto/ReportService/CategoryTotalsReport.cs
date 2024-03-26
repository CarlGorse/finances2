using finances.api.Data.Models;
using finances.api.Enums;
using System.Collections.Generic;

namespace finances.api.Dto.ReportService {
    public class CategoryTotalsReport {
        public ICollection<Category> Categories { get; set; }
        public ICollection<CategoryTotal> CategoryTotals { get; set; }
        public ICollection<string> Errors { get; set; }
        public ICollection<Group> Groups { get; set; }
        public ICollection<GroupTotal> GroupTotals { get; set; }
        public ServiceResult ServiceResult { get; set; }
        public ICollection<YearAndPeriod> YearsAndPeriods { get; set; }
        public ICollection<YearAndPeriodTotal> YearAndPeriodTotals { get; set; }
    }
}
