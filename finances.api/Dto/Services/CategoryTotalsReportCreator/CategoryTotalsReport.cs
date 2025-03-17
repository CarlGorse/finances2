using finances2.api.Data.Models;
using finances2.api.Dto.Services.CategoryTotalsReportCreator;
using finances2.api.Enums;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Dto.Services.CategoryTotalsReportCreator {
    public class CategoryTotalsReport {
        public IOrderedEnumerable<Category> Categories { get; set; }
        public ICollection<CategoryTotal> CategoryTotals { get; set; }
        public ICollection<string> Errors { get; set; }
        public IOrderedEnumerable<Group> Groups { get; set; }
        public ICollection<GroupTotal> GroupTotals { get; set; }
        public ServiceResult ServiceResult { get; set; }
        public ICollection<YearAndPeriod> YearsAndPeriods { get; set; }
        public ICollection<YearAndPeriodTotal> YearAndPeriodTotals { get; set; }
    }
}
