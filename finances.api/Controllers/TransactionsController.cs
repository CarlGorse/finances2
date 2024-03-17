using finances.api.Data.Models;
using finances.api.Models;
using finances.api.Repositories;
using finances.api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace finances.api.Controllers {

    public class TransactionsController(
        ITransactionRepository transactionRepository,
        ISearchCriteriaService searchCriteriaService,
        IReportService reportService) : Controller {

        private readonly IReportService _reportService = reportService;
        private readonly ISearchCriteriaService _searchCriteriaService = searchCriteriaService;
        private readonly ITransactionRepository _transactionRepository = transactionRepository;

        [HttpPost]
        public IActionResult Get([FromBody] SearchCriteriaModel searchCriteria) {

            if (!_searchCriteriaService.ValidateSearchCriteria(searchCriteria, out var validationErrors)) {
                return StatusCode(StatusCodes.Status406NotAcceptable, JsonSerializer.Serialize(new { searchCriteria, validationErrors }));
            }

            var transactionFilters = _searchCriteriaService.CreateTransactionFilters(searchCriteria);

            var transactions = _reportService.GetTransactionTotals(transactionFilters);

            foreach (var reportRow in transactions) {
                _transactionRepository.SetWageTotalForEffDate(reportRow.Transaction);
            }

            return Ok(new { searchCriteria, transactions });
        }

        [HttpPost]
        public IActionResult Add([FromBody] Transaction transaction) {

            var result = _transactionRepository.Add(transaction, out var validationErrors);

            return result switch {
                EditResult.Ok => Ok(transaction),
                EditResult.Invalid => StatusCode(StatusCodes.Status400BadRequest, JsonSerializer.Serialize(new { transaction, validationErrors })),
                _ => StatusCode(StatusCodes.Status500InternalServerError, JsonSerializer.Serialize(new { transaction, validationErrors })),
            };
        }
    }
}
