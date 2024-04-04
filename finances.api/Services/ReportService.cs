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

    public class ReportService(
        IGroupRepository groupRepository,
        ISearchCriteriaService searchCriteriaService,
        IYearAndPeriodService yearAndPeriodService,
        ITransactionRepository transactionsRepository,
        ICategoryRepository categoryRepository) : IReportService {

        private readonly ICategoryRepository _categoryRepository = categoryRepository;
        private readonly IGroupRepository _groupRepository = groupRepository;
        private readonly ISearchCriteriaService _searchCriteriaService = searchCriteriaService;
        private readonly IYearAndPeriodService _yearAndPeriodService = yearAndPeriodService;
        private readonly ITransactionRepository _transactionsRepository = transactionsRepository;

        public CategoryTotalsReport GetCategoryTotalsReport(SearchCriteria searchCriteria) {

            List<string> errors = [];

            _searchCriteriaService.ValidateSearchCriteria(searchCriteria, errors);

            if (errors.Count > 0) {
                return new CategoryTotalsReport {
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

            var transactions = _transactionsRepository.Get(searchCriteria);
            var allTransactions = _transactionsRepository.All();

            var groupTotals = GetGroupTotals(transactions, allTransactions);

            var categoryTotals = GetCategoryTotals(transactions, allTransactions);

            var yearAndPeriodTotals = GetYearAndPeriodTotals(transactions, allTransactions);

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

        private static List<GroupTotal> GetGroupTotals(IQueryable<Transaction> transactions, IQueryable<Transaction> allTransactions) {

            return transactions
                    .GroupBy(y => y.Category.GroupId)
                    .Select(y => new GroupTotal {
                        GroupId = y.Key,
                        YearAndPeriodTotals = transactions
                                                .Where(x => x.Category.GroupId == y.Key)
                                                .GroupBy(y => new { y.EffDate.Year, y.EffDate.Month })
                                                .Select(x => new YearAndPeriodTotal {
                                                    YearAndPeriod = new YearAndPeriod(x.Key.Year, x.Key.Month),
                                                    Total = x.Sum(t => t.Credit) - x.Sum(t => t.Debit),
                                                    YTDTotal = allTransactions.Where(z => z.Category.GroupId == y.Key && (z.EffDate.Year < x.Key.Year || (z.EffDate.Year == x.Key.Year && (z.EffDate.Month <= x.Key.Month)))).Sum(t => t.Credit - t.Debit)
                                                }).ToList()
                    }).ToList();
        }

        private static List<CategoryTotal> GetCategoryTotals(IQueryable<Transaction> transactions, IQueryable<Transaction> allTransactions) {

            return transactions
                    .GroupBy(y => y.Category.CategoryId)
                    .Select(y => new CategoryTotal {
                        CategoryId = y.Key,
                        YearAndPeriodTotals = transactions
                                                .Where(x => x.CategoryId == y.Key)
                                                .GroupBy(y => new { y.EffDate.Year, y.EffDate.Month })
                                                .Select(x => new YearAndPeriodTotal {
                                                    YearAndPeriod = new YearAndPeriod(x.Key.Year, x.Key.Month),
                                                    Total = x.Sum(t => t.Credit) - x.Sum(t => t.Debit),
                                                    YTDTotal = allTransactions.Where(z => z.CategoryId == y.Key && (z.EffDate.Year < x.Key.Year || (z.EffDate.Year == x.Key.Year && (z.EffDate.Month <= x.Key.Month)))).Sum(t => t.Credit - t.Debit)
                                                }).ToList()
                    }).ToList();
        }

        private static List<YearAndPeriodTotal> GetYearAndPeriodTotals(IQueryable<Transaction> transactions, IQueryable<Transaction> allTransactions) {

            return transactions
                    .GroupBy(y => new { y.EffDate.Year, y.EffDate.Month })
                    .Select(x => new YearAndPeriodTotal {
                        YearAndPeriod = new YearAndPeriod(x.Key.Year, x.Key.Month),
                        Total = x.Sum(t => t.Credit) - x.Sum(t => t.Debit),
                        YTDTotal = allTransactions.Where(z => z.EffDate.Year < x.Key.Year || (z.EffDate.Year == x.Key.Year && (z.EffDate.Month <= x.Key.Month))).Sum(t => t.Credit - t.Debit)
                    }).ToList();
        }
    }
}
