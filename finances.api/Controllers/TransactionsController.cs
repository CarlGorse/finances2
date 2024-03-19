using finances.api.Data.Models;
using finances.api.Enums;
using finances.api.Models;
using finances.api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text.Json;

namespace finances.api.Controllers {

    public class TransactionsController(ITransactionManagementService transactionManagementService) : Controller {

        private readonly ITransactionManagementService _transactionManagementService = transactionManagementService;

        [HttpPost]
        public IActionResult Get([FromBody] SearchCriteriaModel searchCriteria) {

            var result = _transactionManagementService.Get(searchCriteria, out var validationErrors, out var transactions);

            return result switch {
                ServiceResult.Invalid => StatusCode(
                    StatusCodes.Status406NotAcceptable,
                    JsonSerializer.Serialize(new { searchCriteria, validationErrors })),
                ServiceResult.Error => StatusCode(
                    StatusCodes.Status500InternalServerError,
                    JsonSerializer.Serialize(new { searchCriteria, validationErrors })),
                _ => Ok(new { searchCriteria, transactions })
            };
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

            var result = _transactionManagementService.MoveWages(model, out var validationErrors);

            return _returnActionForServiceResult(result, new { model }, new { model, validationErrors });
        }

        private IActionResult _returnActionForServiceResult(ServiceResult result, object successPayload, object failurePayload) {
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
