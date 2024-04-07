using finances.api.Dto;
using finances.api.Enums;
using finances.api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace finances.api.Controllers {

    public class ReportTotalsController(IReportService reportService) : Controller {

        private readonly IReportService _reportService = reportService;

        [HttpPost]
        public IActionResult GetCategoryTotals([FromBody] YearAndPeriodSearch yearAndPeriodSearch) {

            var report = _reportService.GetCategoryTotalsReport(yearAndPeriodSearch);

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
    }
}
