using Finances.Engine.Data.Models.ReportTotals;
using Finances.Engine.Data.Repositories.Interfaces;
using Finances.Engine.Models;
using Finances.Engine.Services;
using Finances.Engine.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace Finances.App.WebApp.Controllers {

    public class CategoryTotalsReportController : Controller {

        public const string ControllerName = "CategoryTotalsReport";

        public static class ActionNames {
            public const string Index = "Index";
        }

        private readonly ICategoryRepository _CategoryRepository;
        private readonly ICategoryGroupRepository _CategoryGroupRepository;
        private readonly IReportService _ReportService;
        private readonly ISearchCriteriaService _SearchCriteriaService;

        public CategoryTotalsReportController(
            IReportService reportService,
            ICategoryRepository categoryRepository,
            ICategoryGroupRepository categoryGroupRepository,
            ISearchCriteriaService searchCriteriaService) {

            _ReportService = reportService;
            _CategoryRepository = categoryRepository;
            _CategoryGroupRepository = categoryGroupRepository;
            _SearchCriteriaService = searchCriteriaService;
        }

        [HttpGet]
        public IActionResult Index() {

            var model = _SearchCriteriaService.CreateDefaultModelSearchCriteria(
                periodsToDeductFromStart: -1, periodsToAddToEnd: 2);

            return View(ActionNames.Index, model);

        }

        [HttpPost]
        public IActionResult Search(SearchCriteriaModel searchCriteria) {

            var validationErrors = new List<string>();
            if (!_SearchCriteriaService.ValidateSearchCriteria(searchCriteria, validationErrors)) {
                return StatusCode(StatusCodes.Status406NotAcceptable, JsonSerializer.Serialize(new { searchCriteria, validationErrors }));
            }

            var transactionFilters = _SearchCriteriaService.CreateTransactionFiltersFromSearchCriteria(searchCriteria);

            var categoryTotals = _ReportService.GetCategoryTotals(transactionFilters).ToList();

            var yearsAndPeriods = _SearchCriteriaService.CalculateYearsAndPeriodsWithInSearchCriteria(searchCriteria);

            var categoryGroups = _CategoryGroupRepository.CategoryGroups.OrderBy(x => x.DisplayOrder);

            var categories = _CategoryRepository.Categories.OrderBy(x => x.GroupDisplayOrder);

            var categoryGroupTotals = categoryTotals
                .GroupBy(x => new { x.Category.Group.CategoryGroupId, x.Year, x.Period })
                .Select(x => new CategoryGroupTotal {
                    Year = x.Key.Year,
                    Period = x.Key.Period,
                    CategoryGroupId = x.Key.CategoryGroupId,
                    AccumulatedCreditByPeriod = x.Sum(y => y.AccumulatedCreditByPeriod),
                    AccumulatedDebitByPeriod = x.Sum(y => y.AccumulatedDebitByPeriod),
                    AccumulatedTotalByPeriod = x.Sum(y => y.AccumulatedTotalByPeriod),
                    AverageCreditByPeriod = x.Sum(y => y.AverageCreditByPeriod),
                    AverageDebitByPeriod = x.Sum(y => y.AverageDebitByPeriod),
                    AverageTotalByPeriod = x.Sum(y => y.AverageTotalByPeriod),
                    CreditByPeriod = x.Sum(y => y.CreditByPeriod),
                    DebitByPeriod = x.Sum(y => y.DebitByPeriod),
                    TotalByPeriod = x.Sum(y => y.TotalByPeriod)
                });

            return Ok(new {
                categoryTotals,
                yearsAndPeriods = yearsAndPeriods.Select(x => new { year = x.Year, period = x.Period }),
                categories,
                categoryGroups,
                currentYearAndPeriod = new YearAndPeriod { Period = DateTime.Now.Month, Year = DateTime.Now.Year },
                categoryGroupTotals
            });

        }
    }
}
