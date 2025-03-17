using finances.api.Dto;

namespace finances.api.Services {

    public interface ICategoryTotalsReportCreator {
        Dto.ReportService.CategoryTotalsReport Create(YearAndPeriodSearch yearAndPeriodSearch);
    }
}