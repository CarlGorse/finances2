using finances.api.Data.Models;
using finances.api.Enums;
using finances.api.Logic;
using finances.api.Models;
using finances.api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace finances.api.Controllers {

    public class TransactionsController(ITransactionManagementService transactionManagementService) : Controller {

        private readonly ITransactionManagementService _transactionManagementService = transactionManagementService;

        private const int _pageSize = 15;

        [HttpPost]
        public IActionResult Get([FromBody] SearchCriteriaModel searchCriteria) {

            var result = _transactionManagementService.Get(searchCriteria, out var validationErrors, out var transactions);

            if (result == ServiceResult.Invalid) {
                return StatusCode(
                        StatusCodes.Status406NotAcceptable,
                        JsonSerializer.Serialize(new { searchCriteria, validationErrors }));
            }

            if (result == ServiceResult.Error) {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    JsonSerializer.Serialize(new { searchCriteria, validationErrors }));
            }

            var pagedTransactions = PagingLogic.GetPagedItems(transactions.ToList(), _pageSize, searchCriteria.PageNo);

            var pageCount = PagingLogic.GetPageCount(transactions.Count(), _pageSize);

            return Ok(new { searchCriteria, transactions = pagedTransactions, searchCriteria.PageNo, pageCount });
        }

        [HttpPost]
        public IActionResult Add([FromBody] Transaction transaction) {

            var result = _transactionManagementService.Add(transaction, out var validationErrors);

            return _returnActionForServiceResult(result, new { transaction }, new { transaction, validationErrors });
        }

        [HttpPost]
        public IActionResult Edit([FromBody] Transaction transaction) {

            var result = _transactionManagementService.Edit(transaction, out var validationErrors);

            return _returnActionForServiceResult(result, new { transaction }, new { transaction, validationErrors });
        }

        [HttpPost]
        public IActionResult Delete([FromBody] IEnumerable<int> ids) {

            var result = _transactionManagementService.Delete(ids, out var validationErrors);

            return _returnActionForServiceResult(result, new { ids }, new { ids, validationErrors });
        }

        [HttpPost]
        public IActionResult MoveWages([FromBody] MoveWagesModel model) {

            var result = _transactionManagementService.MoveWages(model, out var validationErrors, out var transactionFrom, out var transactionTo);

            return _returnActionForServiceResult(result, new { transactionFrom, transactionTo, model.CreditToMove }, new { validationErrors });
        }

        private ObjectResult _returnActionForServiceResult(ServiceResult result, object successPayload, object failurePayload) {
            return result switch {
                ServiceResult.Invalid => StatusCode(
                    StatusCodes.Status406NotAcceptable,
                    JsonSerializer.Serialize(failurePayload)),
                ServiceResult.Error => StatusCode(
                    StatusCodes.Status500InternalServerError,
                    JsonSerializer.Serialize(failurePayload)),
                _ => Ok(successPayload)
            };
        }
    }
}
