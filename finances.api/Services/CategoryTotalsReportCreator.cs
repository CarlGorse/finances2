using finances.api.CategoryTotalsReport.Delegates;
using finances.api.CategoryTotalsReport.Dto;
using finances.api.CategoryTotalsReport.Dto.CategoryTotalsReport;
using finances.api.CategoryTotalsReport.Enums;
using finances.api.CategoryTotalsReport.Factories;
using finances.api.Services.Interfaces;
using finances2.api.Data.Models;
using finances2.api.Enums;
using finances2.api.Repositories;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace finances.api.Services {

    public class CategoryTotalsReportCreator(
        IGroupRepository groupRepository,
        IYearAndPeriodSearchValidator yearAndPeriodSearchValidator,
        IYearAndPeriodUtiltities yearAndPeriodUtilties,
        ITransactionRepository transactionsRepository,
        ICategoryRepository categoryRepository,
        ITransactionValueCalculaionFactory transactionValueCalculatorFactory,
        ITransactionFilterFactory transactionTotalTypeFactory) : ICategoryTotalsReportCreator {

        public CategoryTotalsReportDTO Create(YearAndPeriodSearchDTO searchCriteria,
                                           TeasactionValueCalculationTypes transactionValueCalculatorType,
                                           TransactionFilterTypes transactionTotalCalculatorType) {

            List<string> errors = [];

            yearAndPeriodSearchValidator.Validate(searchCriteria, errors);

            if (errors.Count > 0) {
                return new CategoryTotalsReportDTO {
                    Errors = errors,
                    ServiceResult = ServiceResult.Invalid
                };
            }

            var calculaitonData = GetData(searchCriteria,
                                          transactionValueCalculatorType,
                                          transactionTotalCalculatorType);

            var groupTotals = GetGroupTotals(calculaitonData);
            var categoryTotals = GetCategoryTotals(calculaitonData);
            var yearAndPeriodTotals = GetYearAndPeriodTotals(calculaitonData);

            var serviceResult = ServiceResult.Ok;

            return new CategoryTotalsReportDTO {
                Categories = calculaitonData.Categories.OrderBy(x => x.GroupDisplayOrder),
                CategoryTotals = categoryTotals,
                Groups = calculaitonData.Groups.OrderBy(x => x.DisplayOrder),
                GroupTotals = groupTotals,
                ServiceResult = serviceResult,
                YearsAndPeriods = calculaitonData.AllYearsAndPeriods,
                YearAndPeriodTotals = yearAndPeriodTotals
            };
        }

        private CalculationData GetData(
            YearAndPeriodSearchDTO searchCriteria,
            TeasactionValueCalculationTypes transactionValueCalculationType,
            TransactionFilterTypes transactionFilter
            ) {

            var allYearsAndPeriods = yearAndPeriodUtilties.GetYearsAndPeriods(
                searchCriteria.StartYear,
                searchCriteria.StartPeriod,
                searchCriteria.EndYear,
                searchCriteria.EndPeriod).ToList();

            var categories = categoryRepository.All().ToList();
            var groups = groupRepository.All().ToList();

            var transactions = transactionFilter == TransactionFilterTypes.YearAndPeriod ?
                transactionsRepository.Get(searchCriteria.StartDate, searchCriteria.EndDate).ToList() :
                transactionsRepository.All().ToList();

            var transactionValueCalculator = transactionValueCalculatorFactory.Create(transactionValueCalculationType);
            var transactionTotalTypeCalculator = transactionTotalTypeFactory.Create(transactionFilter);

            return new CalculationData {
                AllYearsAndPeriods = allYearsAndPeriods,
                Categories = categories,
                Groups = groups,
                Transactions = transactions,
                TransactionValueCalculation = transactionValueCalculator,
                TransactionFilter = transactionTotalTypeCalculator,
            };
        }

        private static List<GroupTotalDTO> GetGroupTotals(CalculationData calculationDate) {

            return calculationDate.Categories
                    .GroupBy(category => category.GroupId)
                    .Select(groupByCategory => new GroupTotalDTO {
                        GroupId = groupByCategory.Key,
                        YearAndPeriodTotals = calculationDate.AllYearsAndPeriods
                                                .Select(x => new YearAndPeriodTotalDTO {
                                                    YearAndPeriod = x,
                                                    Total = calculationDate.Transactions
                                                                .Where(z => z.Category.GroupId == groupByCategory.Key && calculationDate.TransactionFilter(z, x))
                                                                .Sum(t => calculationDate.TransactionValueCalculation(t)),
                                                }).ToList()
                    }).ToList();
        }

        private static List<CategoryTotalDTO> GetCategoryTotals(CalculationData calculationDate) {

            return calculationDate.Categories
                    .GroupBy(category => category.CategoryId)
                    .Select(groupByCategory => new CategoryTotalDTO {
                        CategoryId = groupByCategory.Key,
                        YearAndPeriodTotals = calculationDate.AllYearsAndPeriods
                                                .Select(x => new YearAndPeriodTotalDTO {
                                                    YearAndPeriod = x,
                                                    Total = calculationDate.Transactions
                                                                .Where(z => z.CategoryId == groupByCategory.Key && calculationDate.TransactionFilter(z, x))
                                                                .Sum(t => calculationDate.TransactionValueCalculation(t)),
                                                }).ToList()
                    }).ToList();
        }

        private static List<YearAndPeriodTotalDTO> GetYearAndPeriodTotals(CalculationData calculationDate) {

            return calculationDate.AllYearsAndPeriods
                    .GroupBy(yearAndPeriod => new { yearAndPeriod.Year, yearAndPeriod.Period })
                    .Select(groupByYearAndPeriod => new YearAndPeriodTotalDTO {
                        YearAndPeriod = new YearAndPeriod(groupByYearAndPeriod.Key.Year, groupByYearAndPeriod.Key.Period),
                        Total = calculationDate.Transactions
                                    .Where(z => calculationDate.TransactionFilter(z, new YearAndPeriod(groupByYearAndPeriod.Key.Year, groupByYearAndPeriod.Key.Period)))
                                    .Sum(t => calculationDate.TransactionValueCalculation(t))
                    }).ToList();
        }

        private class CalculationData {
            public List<YearAndPeriod> AllYearsAndPeriods { get; set; }
            public List<Category> Categories { get; set; }
            public List<Group> Groups { get; set; }
            public List<Transaction> Transactions { get; set; }
            public TransactionValueCalculation TransactionValueCalculation { get; set; }
            public TransactionFilter TransactionFilter { get; set; }
        }
    }
}
