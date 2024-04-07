using finances.api.Dto;
using finances.api.Dto.ReportService;

namespace finances.api.Services {

    public interface IReportService {
        CategoryTotalsReport GetCategoryTotalsReport(YearAndPeriodSearch yearAndPeriodSearch);
    }
}