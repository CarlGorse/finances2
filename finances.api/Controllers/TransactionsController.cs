using finances.api.Data.Models;
using finances.api.Models;
using finances.api.Repositories;
using finances.api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace finances.api.Controllers {

    public class TransactionsController : Controller {

        private readonly IReportService _reportService;
        private readonly ISearchCriteriaService _searchCriteriaService;
        private readonly ITransactionRepository _transactionRepository;

        public TransactionsController(
            ITransactionRepository transactionRepository,
            ISearchCriteriaService searchCriteriaService,
            IReportService reportService) {

            _transactionRepository = transactionRepository;
            _searchCriteriaService = searchCriteriaService;
            _reportService = reportService;
        }

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

            if (!result) {
                return StatusCode(StatusCodes.Status406NotAcceptable, JsonSerializer.Serialize(new { transaction, validationErrors }));
            }

            return Ok(transaction);
        }
    }
}
