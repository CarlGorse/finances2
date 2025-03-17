using finances.api.Data.Models;
using finances.api.Dto;
using finances.api.Dto.ReportService;
using finances.api.Enums;
using finances.api.Repositories;
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
        ICategoryRepository categoryRepository) : ICategoryTotalsReportCreator {

        private readonly ICategoryRepository _categoryRepository = categoryRepository;
        private readonly IGroupRepository _groupRepository = groupRepository;
        private readonly IYearAndPeriodSearchValidationService _searchCriteriaService = searchCriteriaService;
        private readonly IYearAndPeriodService _yearAndPeriodService = yearAndPeriodService;
        private readonly ITransactionRepository _transactionsRepository = transactionsRepository;

        public Dto.ReportService.CategoryTotalsReport Create(YearAndPeriodSearch searchCriteria) {

            List<string> errors = [];

            _searchCriteriaService.Validate(searchCriteria, errors);

            if (errors.Count > 0) {
                return new Dto.ReportService.CategoryTotalsReport {
                    Errors = errors,
                    ServiceResult = ServiceResult.Invalid
                };
            }

            var allYearsAndPeriods = _yearAndPeriodService.GetYearsAndPeriods(
                searchCriteria.StartYear,
                searchCriteria.StartPeriod,
                searchCriteria.EndYear,
                searchCriteria.EndPeriod).ToList();

            var categories = _categoryRepository.All().ToList();

            var groups = _groupRepository.All().ToList();

            var transactions = _transactionsRepository.Get(searchCriteria.StartDate, searchCriteria.EndDate).ToList();
            var allTransactions = _transactionsRepository.All().ToList();

            var groupTotals = GetGroupTotals(categories, allYearsAndPeriods, transactions, allTransactions);

            var categoryTotals = GetCategoryTotals(categories, allYearsAndPeriods, transactions, allTransactions);

            var yearAndPeriodTotals = GetYearAndPeriodTotals(allYearsAndPeriods, transactions, allTransactions);

            var serviceResult = ServiceResult.Ok;

            return new Dto.ReportService.CategoryTotalsReport {
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
                                                       IList<Transaction> allTransactions) {

            return categories
                    .GroupBy(category => category.GroupId)
                    .Select(groupByCategory => new GroupTotal {
                        GroupId = groupByCategory.Key,
                        YearAndPeriodTotals = yearsAndPeriods
                                                .Select(x => new YearAndPeriodTotal {
                                                    YearAndPeriod = x,
                                                    Total = transactions.Where(z => z.Category.GroupId == groupByCategory.Key && z.EffDate.Year == x.Year && z.EffDate.Month == x.Period).Sum(t => t.Credit - t.Debit),
                                                    YTDTotal = allTransactions.Where(z => z.Category.GroupId == groupByCategory.Key && (z.EffDate.Year < x.Year || (z.EffDate.Year == x.Year && (z.EffDate.Month <= x.Period)))).Sum(t => t.Credit - t.Debit)
                                                }).ToList()
                    }).ToList();
        }

        private static List<CategoryTotal> GetCategoryTotals(IList<Category> categories,
                                                             IList<YearAndPeriod> yearsAndPeriods,
                                                             IList<Transaction> transactions,
                                                             IList<Transaction> allTransactions) {

            return categories
                    .GroupBy(category => category.CategoryId)
                    .Select(groupByCategory => new CategoryTotal {
                        CategoryId = groupByCategory.Key,
                        YearAndPeriodTotals = yearsAndPeriods
                                                .Select(x => new YearAndPeriodTotal {
                                                    YearAndPeriod = x,
                                                    Total = transactions.Where(z => z.CategoryId == groupByCategory.Key && z.EffDate.Year == x.Year && z.EffDate.Month == x.Period).Sum(t => t.Credit - t.Debit),
                                                    YTDTotal = allTransactions.Where(z => z.CategoryId == groupByCategory.Key && (z.EffDate.Year < x.Year || (z.EffDate.Year == x.Year && (z.EffDate.Month <= x.Period)))).Sum(t => t.Credit - t.Debit)
                                                }).ToList()
                    }).ToList();
        }

        private static List<YearAndPeriodTotal> GetYearAndPeriodTotals(IList<YearAndPeriod> yearsAndPeriods,
                                                                       IList<Transaction> transactions,
                                                                       IList<Transaction> allTransactions) {

            return yearsAndPeriods
                    .GroupBy(yearAndPeriod => new { yearAndPeriod.Year, yearAndPeriod.Period })
                    .Select(groupByYearAndPeriod => new YearAndPeriodTotal {
                        YearAndPeriod = new YearAndPeriod(groupByYearAndPeriod.Key.Year, groupByYearAndPeriod.Key.Period),
                        Total = transactions.Where(z => z.EffDate.Year == groupByYearAndPeriod.Key.Year && z.EffDate.Month == groupByYearAndPeriod.Key.Period).Sum(t => t.Credit - t.Debit),
                        YTDTotal = allTransactions.Where(z => z.EffDate.Year < groupByYearAndPeriod.Key.Year || (z.EffDate.Year == groupByYearAndPeriod.Key.Year && (z.EffDate.Month <= groupByYearAndPeriod.Key.Period))).Sum(t => t.Credit - t.Debit)
                    }).ToList();
        }
    }
}
