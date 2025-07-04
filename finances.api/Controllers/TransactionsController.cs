﻿using finances.api.CategoryTotalsReport.Dto;
using finances.api.Services.Interfaces;
using finances2.api.Data.Models;
using finances2.api.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text.Json;

namespace finances.api.Controllers {

    public class TransactionsController(
        ITransactionGetter transacrionGetter,
        ITransactionManagementService transactionManagementService,
        ITransactionWageMover transactionWageMover
        ) : Controller {

        private readonly ITransactionManagementService _transactionManagementService = transactionManagementService;
        private readonly ITransactionWageMover _transacrionWageMover = transactionWageMover;

        [HttpPost]
        public IActionResult Get([FromBody] GetTransactionsParamsDTO @params) {

            var result = transacrionGetter.Get(@params);

            return ReturnActionForServiceResult(
                result.Result,
                successPayload: result,
                failurePayload: new { result.Errors });
        }

        [HttpPost]
        public IActionResult Add([FromBody] Transaction transaction) {

            var result = _transactionManagementService.Add(transaction, out var validationErrors);

            return ReturnActionForServiceResult(
                result,
                successPayload: new { transaction },
                failurePayload: new { transaction, validationErrors });
        }

        [HttpPost]
        public IActionResult Edit([FromBody] Transaction transaction) {

            var result = _transactionManagementService.Edit(transaction, out var validationErrors);

            return ReturnActionForServiceResult(
                result,
                successPayload: new { transaction },
                failurePayload: new { transaction, validationErrors });
        }

        [HttpPost]
        public IActionResult Delete([FromBody] IEnumerable<int> ids) {

            var result = _transactionManagementService.Delete(ids, out var validationErrors);

            return ReturnActionForServiceResult(
                result,
                successPayload: new { ids },
                failurePayload: new { ids, validationErrors });
        }

        [HttpPost]
        public IActionResult MoveWages([FromBody] MoveWagesDTO model) {

            var result = _transacrionWageMover.MoveWages(
                model,
                out var validationErrors,
                out var transactionFrom,
                out var transactionTo);

            return ReturnActionForServiceResult(
                result,
                successPayload: new { transactionFrom, transactionTo, model.CreditToMove },
                failurePayload: new { validationErrors });
        }

        private ObjectResult ReturnActionForServiceResult(ServiceResult result, object successPayload, object failurePayload) {
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
