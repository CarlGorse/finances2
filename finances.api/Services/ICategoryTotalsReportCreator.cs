using finances.api.Dto.Services.CategoryTotalsReportCreator;
using finances.api.Enums;
using finances2.api.Dto;

namespace finances.api.Services {

    public interface ICategoryTotalsReportCreator {
        CategoryTotalsReport Create(YearAndPeriodSearch searchCriteria, TeasactionValueCalculatorTypes calculatorType, TransactionTotalCalculatorTypes totalType);
    }
}