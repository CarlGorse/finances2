using finances.api.CategoryTotalsReport.Dto;
using finances.api.CategoryTotalsReport.Dto.CategoryTotalsReport;
using finances.api.CategoryTotalsReport.Enums;

namespace finances.api.Services.Interfaces {

    public interface ICategoryTotalsReportCreator {
        CategoryTotalsReportDTO Create(YearAndPeriodSearchDTO searchCriteria, TeasactionValueCalculationTypes calculatorType, TransactionFilterTypes totalType);
    }
}