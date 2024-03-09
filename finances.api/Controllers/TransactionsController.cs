using Finances.Engine.Data.Repositories.Interfaces;
using Finances.Engine.Models;
using Finances.Engine.Services;
using Finances.Engine.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Text.Json;

namespace finances.api.Controllers {

    public class TransactionsController : Controller {

        public const string ControllerName = "Transactions";

        public static class ActionNames {
            public const string Add = "Add";
            public const string Delete = "Delete";
            public const string Edit = "Edit";
            public const string Index = "Index";
            public const string MoveWages = "_MoveWages";
            public const string Search = "Search";
        }

        private readonly IReportService _ReportService;
        private readonly ISearchCriteriaService _SearchCriteriaService;
        private readonly ITransactionRepository _TransactionRepository;

        public TransactionsController(
            ITransactionRepository transactionRepository,
            ISearchCriteriaService searchCriteriaService,
            IReportService reportService) {

            _TransactionRepository = transactionRepository;
            _SearchCriteriaService = searchCriteriaService;
            _ReportService = reportService;
        }

        [HttpPost]
        public IActionResult Get([FromBody] SearchCriteriaModel searchCriteria) {

            var validationErrors = new List<string>();

            if (!_SearchCriteriaService.ValidateSearchCriteria(searchCriteria, validationErrors)) {
                return StatusCode(StatusCodes.Status406NotAcceptable, JsonSerializer.Serialize(new { searchCriteria, validationErrors }));
            }

            var transactionFilters = _SearchCriteriaService.CreateTransactionFiltersFromSearchCriteria(searchCriteria);

            transactionFilters.AccountId = searchCriteria.AccountId;

            if (searchCriteria.CategoryId > 0) {
                transactionFilters.CategoryIds.Add(searchCriteria.CategoryId);
            }

            var transactions = _ReportService.GetTransactionRunningTotals(transactionFilters);

            foreach (var reportRow in transactions) {
                _TransactionRepository.SetWageTotalForEffDate(reportRow.Transaction);
            }

            return Ok(new { searchCriteria, transactions });
        }
    }
}
