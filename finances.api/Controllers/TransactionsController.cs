using finances.api.Data.Models;
using finances.api.Models;
using finances.api.Repositories;
using finances.api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text.Json;

namespace finances.api.Controllers {

    public class TransactionsController(
        ITransactionRepository transactionRepository,
        ISearchCriteriaService searchCriteriaService,
        IReportService reportService,
        IEditableItemControllerService<Transaction> controllerService) : Controller {

        private readonly IEditableItemControllerService<Transaction> _controllerService = controllerService;
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
            return _controllerService.Add(transaction);
        }

        [HttpPost]
        public IActionResult Edit([FromBody] Transaction transaction) {
            return _controllerService.Edit(transaction);
        }

        [HttpPost]
        public IActionResult Delete([FromBody] IEnumerable<int> ids) {
            return _controllerService.Delete(ids);
        }
    }
}
