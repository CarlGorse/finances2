using finances.api.Delegates;
using finances.api.Dto.Services.CategoryTotalsReportCreator;
using finances.api.Enums;
using finances.api.Factories;
using finances2.api.Data.Models;
using finances2.api.Dto;
using finances2.api.Dto.Services.CategoryTotalsReportCreator;
using finances2.api.Enums;
using finances2.api.Repositories;
using finances2.api.Services;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace finances.api.Services {

    public class CategoryTotalsReportCreator(
        IGroupRepository groupRepository,
        IYearAndPeriodSearchValidationService searchCriteriaService,
        IYearAndPeriodService yearAndPeriodService,
        ITransactionRepository transactionsRepository,
        ICategoryRepository categoryRepository,
        ITransactionValueCalculatorFactory transactionValueCalculatorFactory,
        ITransactionTotalTypeCalculatorFactory transactionTotalTypeFactory) : ICategoryTotalsReportCreator {

        public CategoryTotalsReport Create(YearAndPeriodSearch searchCriteria,
                                           TeasactionValueCalculatorTypes calculatorType,
                                           TransactionTotalCalculatorTypes totalType) {

            List<string> errors = [];

            searchCriteriaService.Validate(searchCriteria, errors);

            if (errors.Count > 0) {
                return new CategoryTotalsReport {
                    Errors = errors,
                    ServiceResult = ServiceResult.Invalid
                };
            }

            var allYearsAndPeriods = yearAndPeriodService.GetYearsAndPeriods(
                searchCriteria.StartYear,
                searchCriteria.StartPeriod,
                searchCriteria.EndYear,
                searchCriteria.EndPeriod).ToList();

            var categories = categoryRepository.All().ToList();

            var groups = groupRepository.All().ToList();

            var transactions = totalType == TransactionTotalCalculatorTypes.YearAndPeriod ?
                transactionsRepository.Get(searchCriteria.StartDate, searchCriteria.EndDate).ToList() :
                transactionsRepository.All().ToList();

            var valueCalculator = transactionValueCalculatorFactory.Create(calculatorType);
            var transactionTotalTypeCalculator = transactionTotalTypeFactory.Create(totalType);

            var groupTotals = GetGroupTotals(categories, allYearsAndPeriods, transactions, valueCalculator, transactionTotalTypeCalculator);

            var categoryTotals = GetCategoryTotals(categories, allYearsAndPeriods, transactions, valueCalculator, transactionTotalTypeCalculator);

            var yearAndPeriodTotals = GetYearAndPeriodTotals(allYearsAndPeriods, transactions, valueCalculator, transactionTotalTypeCalculator);

            var serviceResult = ServiceResult.Ok;

            return new CategoryTotalsReport {
                Categories = categories.OrderBy(x => x.GroupDisplayOrder),
                CategoryTotals = categoryTotals,
                Groups = groups.OrderBy(x => x.DisplayOrder),
                GroupTotals = groupTotals,
                ServiceResult = serviceResult,
                YearsAndPeriods = allYearsAndPeriods,
                YearAndPeriodTotals = yearAndPeriodTotals
            };
        }

        private static List<GroupTotal> GetGroupTotals(IList<Category> categories,
                                                       IList<YearAndPeriod> yearsAndPeriods,
                                                       IList<Transaction> transactions,
                                                       TransactionValueCalculator valueCalculator,
                                                       TransactionTotalTypeCalculator totalTypeCalculator
            ) {

            return categories
                    .GroupBy(category => category.GroupId)
                    .Select(groupByCategory => new GroupTotal {
                        GroupId = groupByCategory.Key,
                        YearAndPeriodTotals = yearsAndPeriods
                                                .Select(x => new YearAndPeriodTotal {
                                                    YearAndPeriod = x,
                                                    Total = transactions.Where(z => z.Category.GroupId == groupByCategory.Key && totalTypeCalculator(z, x)).Sum(t => valueCalculator(t)),
                                                }).ToList()
                    }).ToList();
        }

        private static List<CategoryTotal> GetCategoryTotals(IList<Category> categories,
                                                             IList<YearAndPeriod> yearsAndPeriods,
                                                             IList<Transaction> transactions,
                                                             TransactionValueCalculator valueCalculator,
                                                             TransactionTotalTypeCalculator totalTypeCalculator) {

            return categories
                    .GroupBy(category => category.CategoryId)
                    .Select(groupByCategory => new CategoryTotal {
                        CategoryId = groupByCategory.Key,
                        YearAndPeriodTotals = yearsAndPeriods
                                                .Select(x => new YearAndPeriodTotal {
                                                    YearAndPeriod = x,
                                                    Total = transactions.Where(z => z.CategoryId == groupByCategory.Key && totalTypeCalculator(z, x)).Sum(t => valueCalculator(t)),
                                                }).ToList()
                    }).ToList();
        }

        private static List<YearAndPeriodTotal> GetYearAndPeriodTotals(IList<YearAndPeriod> yearsAndPeriods,
                                                                       IList<Transaction> transactions,
                                                                       TransactionValueCalculator valueCalculator,
                                                                        TransactionTotalTypeCalculator totalTypeCalculator) {

            return yearsAndPeriods
                    .GroupBy(yearAndPeriod => new { yearAndPeriod.Year, yearAndPeriod.Period })
                    .Select(groupByYearAndPeriod => new YearAndPeriodTotal {
                        YearAndPeriod = new YearAndPeriod(groupByYearAndPeriod.Key.Year, groupByYearAndPeriod.Key.Period),
                        Total = transactions.Where(z => totalTypeCalculator(z, new YearAndPeriod(groupByYearAndPeriod.Key.Year, groupByYearAndPeriod.Key.Period))).Sum(t => valueCalculator(t))
                    }).ToList();
        }
    }
}
