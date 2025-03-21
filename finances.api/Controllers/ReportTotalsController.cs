using finances.api.CategoryTotalsReport.Dto;
using finances.api.CategoryTotalsReport.Enums;
using finances.api.Services.Interfaces;
using finances2.api.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace finances.api.Controllers {

    public class ReportTotalsController(ICategoryTotalsReportCreator categoryTotalsReportCreator) : Controller {

        [HttpPost]
        public IActionResult GetCategoryTotals([FromBody] GetCategoryTotalsParams @params) {

            var report = categoryTotalsReportCreator.Create(@params.YearAndPeriodSearch, @params.ValueCalculatorType, @params.TotalCalculatorType);

            return ReturnActionForServiceResult(
                report.ServiceResult,
                successPayload: report,
                failurePayload: new { report });
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

        public class GetCategoryTotalsParams {
            public YearAndPeriodSearchDTO YearAndPeriodSearch { get; set; }
            public TeasactionValueCalculationTypes ValueCalculatorType { get; set; } = TeasactionValueCalculationTypes.Total;
            public TransactionFilterTypes TotalCalculatorType { get; set; } = (TransactionFilterTypes)TeasactionValueCalculationTypes.Total;
        }
    }
}
