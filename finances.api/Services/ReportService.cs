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

            List<string> errors = new();

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

            var groupTotals = GetGroupTotals(transactions);

            var categoryTotals = GetCategoryTotals(transactions);

            var yearAndPeriodTotals = GetYearAndPeriodTotals(transactions);

            var serviceResult = ServiceResult.Ok;

            return new CategoryTotalsReport {
                Categories = categories,
                CategoryTotals = categoryTotals,
                Groups = groups,
                GroupTotals = groupTotals,
                ServiceResult = serviceResult,
                YearsAndPeriods = allYearsAndPeriods,
                YearAndPeriodTotals = yearAndPeriodTotals
            };
        }

        private List<GroupTotal> GetGroupTotals(IQueryable<Transaction> transactions) {

            return transactions
                    .GroupBy(y => y.Category.GroupId)
                    .Select(y => new GroupTotal {
                        GroupId = y.Key,
                        YearAndPeriodTotals = transactions
                                                .Where(x => x.Category.GroupId == y.Key)
                                                .GroupBy(y => new { y.Year, y.Period })
                                                .Select(x => new YearAndPeriodTotal {
                                                    YearAndPeriod = new YearAndPeriod(x.Key.Year, x.Key.Period),
                                                    Total = x.Sum(t => t.Credit) - x.Sum(t => t.Debit)
                                                }).ToList()
                    }).ToList();
        }

        private List<CategoryTotal> GetCategoryTotals(IQueryable<Transaction> transactions) {

            return transactions
                    .GroupBy(y => y.Category.CategoryId)
                    .Select(y => new CategoryTotal {
                        CategoryId = y.Key,
                        YearAndPeriodTotals = transactions
                                                .Where(x => x.CategoryId == y.Key)
                                                .GroupBy(y => new { y.Year, y.Period })
                                                .Select(x => new YearAndPeriodTotal {
                                                    YearAndPeriod = new YearAndPeriod(x.Key.Year, x.Key.Period),
                                                    Total = x.Sum(t => t.Credit) - x.Sum(t => t.Debit)
                                                }).ToList()
                    }).ToList();
        }

        private List<YearAndPeriodTotal> GetYearAndPeriodTotals(IQueryable<Transaction> transactions) {

            return transactions
                    .GroupBy(y => new { y.Year, y.Period })
                    .Select(x => new YearAndPeriodTotal {
                        YearAndPeriod = new YearAndPeriod(x.Key.Year, x.Key.Period),
                        Total = x.Sum(t => t.Credit) - x.Sum(t => t.Debit)
                    }).ToList();
        }
    }
}
