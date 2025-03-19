using finances2.api.Data.Models;
using finances2.api.Enums;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.CategoryTotalsReport.Dto.CategoryTotalsReport {
    public class CategoryTotalsReportDTO {
        public IOrderedEnumerable<Category> Categories { get; set; }
        public ICollection<CategoryTotalDTO> CategoryTotals { get; set; }
        public ICollection<string> Errors { get; set; }
        public IOrderedEnumerable<Group> Groups { get; set; }
        public ICollection<GroupTotalDTO> GroupTotals { get; set; }
        public ServiceResult ServiceResult { get; set; }
        public ICollection<YearAndPeriod> YearsAndPeriods { get; set; }
        public ICollection<YearAndPeriodTotalDTO> YearAndPeriodTotals { get; set; }
    }
}
