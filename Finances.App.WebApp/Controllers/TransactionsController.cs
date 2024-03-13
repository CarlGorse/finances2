//using Finances.App.WebApp.Interfaces.Services;
//using Finances.App.WebApp.Models.Views.Transactions;
//using Finances.Engine.Data.Interfaces;
//using Finances.Engine.Data.Models;
//using Finances.Engine.Data.Repositories.Interfaces;
//using Finances.Engine.Models;
//using Finances.Engine.Services;
//using Finances.Engine.Services.Interfaces;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text.Json;

//namespace Finances.App.WebApp.Controllers {

//    public class TransactionsController : Controller {

//        public const string ControllerName = "Transactions";

//        public static class ActionNames {
//            public const string Add = "Add";
//            public const string Delete = "Delete";
//            public const string Edit = "Edit";
//            public const string Index = "Index";
//            public const string MoveWages = "_MoveWages";
//            public const string Search = "Search";
//        }

//        private readonly IAccountRepository _AccountRepository;
//        private readonly ICategoryRepository _CategoryRepository;
//        private readonly IEditableItemControllerService<Transaction> _ControllerService;
//        private readonly IFinancesDbContext _DbContext;
//        private readonly IReportService _ReportService;
//        private readonly ISearchCriteriaService _SearchCriteriaService;
//        private readonly ITransactionRepository _TransactionRepository;

//        public TransactionsController(
//            IAccountRepository accountRepository,
//            IReportService reportService,
//            ITransactionRepository transactionRepository,
//            ISearchCriteriaService searchCriteriaService,
//            IFinancesDbContext dbContext,
//            ICategoryRepository categoryRepository,
//            IEditableItemControllerService<Transaction> controllerService) {

//            _AccountRepository = accountRepository;
//            _ReportService = reportService;
//            _TransactionRepository = transactionRepository;
//            _SearchCriteriaService = searchCriteriaService;
//            _DbContext = dbContext;
//            _CategoryRepository = categoryRepository;
//            _ControllerService = controllerService;
//        }

//        [HttpGet]
//        public IActionResult Index() {

//            var model = new TransactionsIndexViewModel {
//                Accounts = _AccountRepository.Accounts,
//                Categories = _CategoryRepository.Categories,
//                YearsAndPeriods = _SearchCriteriaService.CalculateYearsAndPeriodsBetweenStartAndEnd(2020, 1, 2022, 12)
//            };

//            model.SearchCriteriaModel = _SearchCriteriaService.CreateDefaultModelSearchCriteria();

//            return View(ActionNames.Index, model);
//        }

//        [HttpPost]
//        public IActionResult Search2(SearchCriteriaModel searchCriteria) {

//            var validationErrors = new List<string>();

//            if (!_SearchCriteriaService.ValidateSearchCriteria(searchCriteria, validationErrors)) {
//                return StatusCode(StatusCodes.Status406NotAcceptable, JsonSerializer.Serialize(new { searchCriteria, validationErrors }));
//            }

//            var transactionFilters = _SearchCriteriaService.CreateTransactionFiltersFromSearchCriteria(searchCriteria);

//            transactionFilters.AccountId = searchCriteria.AccountId;

//            if (searchCriteria.CategoryId > 0) {
//                transactionFilters.CategoryIds.Add(searchCriteria.CategoryId);
//            }

//            var transactions = _ReportService.GetTransactionRunningTotals(transactionFilters);

//            foreach (var reportRow in transactions) {
//                _TransactionRepository.SetWageTotalForEffDate(reportRow.Transaction);
//            }

//            return Ok(new { searchCriteria, transactions });
//        }

//        [HttpPost]
//        public IActionResult Get(IEnumerable<int> ids) {
//            return _ControllerService.Get(ids);
//        }

//        [HttpPost]
//        public IActionResult Add(AddEditTransactionModel model) {

//            Transaction transactionToDeductFrom = null;
//            ICollection<string> validationErrors = new List<string>();

//            if (model.CategoryIdToDeductWageFrom > 0) {

//                var transactionsToDeductFrom = _TransactionRepository.Get(x =>
//                    x.AccountId == model.Transaction.AccountId
//                    && x.EffDate == model.Transaction.EffDate
//                    && x.IsWage == model.Transaction.IsWage
//                    && x.CategoryId == model.CategoryIdToDeductWageFrom);

//                if (transactionsToDeductFrom == null || !transactionsToDeductFrom.Any()) {
//                    validationErrors.Add("No wage transaction exists for that account, date and category");
//                }
//                else if (transactionsToDeductFrom.Count() > 1) {
//                    validationErrors.Add($"{transactionsToDeductFrom.Count()} transactions exist for that account, date and category");
//                }

//                if (validationErrors.Count > 0) {
//                    return StatusCode(StatusCodes.Status406NotAcceptable, JsonSerializer.Serialize(new { model.Transaction, validationErrors }));
//                }

//                transactionToDeductFrom = transactionsToDeductFrom.Single();
//            }

//            var creditToDeduct = model.Transaction.Credit;
//            if (model.CategoryIdToDeductWageFrom > 0) {
//                model.Transaction.Credit = 0;
//            }

//            var result = _TransactionRepository.Add(model.Transaction, out validationErrors, saveChanges: false);
//            _DbContext.SaveChanges();

//            if (!result) {
//                return StatusCode(StatusCodes.Status406NotAcceptable, JsonSerializer.Serialize(new { model.Transaction, validationErrors }));
//            }

//            if (model.CategoryIdToDeductWageFrom > 0) {
//                DoMoveWages(transactionToDeductFrom.TransactionId, model.Transaction.TransactionId, creditToDeduct, validationErrors);
//                _DbContext.SaveChanges();
//            }

//            return Ok(model.Transaction.TransactionId);
//        }

//        [HttpPost]
//        public IActionResult Edit(Transaction transaction) {
//            return _ControllerService.Edit(transaction);
//        }

//        [HttpPost]
//        public IActionResult Delete(IEnumerable<int> ids) {
//            return _ControllerService.Delete(ids);
//        }

//        [HttpPost]
//        public IActionResult GetTransactionsToMoveWages(int transactionIdFrom, int transactionIdTo) {

//            var validationErrors = new List<string>();

//            ValidateTransactionsToMove(
//                transactionIdFrom,
//                transactionIdTo,
//                validationErrors,
//                out var transactionFrom,
//                out var transactionTo);

//            if (validationErrors.Any()) {
//                return StatusCode(StatusCodes.Status406NotAcceptable, JsonSerializer.Serialize(new { transactionIdFrom, transactionIdTo, validationErrors }));
//            }

//            return Ok(new { transactionIdFrom, transactionIdTo, transactionFrom, transactionTo });
//        }

//        [HttpPost]
//        public IActionResult MoveWages(int transactionIdFrom, int transactionIdTo, decimal creditToMove) {

//            var validationErrors = new List<string>();

//            if (!DoMoveWages(transactionIdFrom, transactionIdTo, creditToMove, validationErrors)) {
//                return StatusCode(StatusCodes.Status406NotAcceptable, JsonSerializer.Serialize(new { transactionIdFrom, transactionIdTo, creditToMove, validationErrors }));
//            }

//            _DbContext.SaveChanges();

//            return Ok(new { transactionIdFrom, transactionIdTo, creditToMove });
//        }

//        private bool DoMoveWages(int transactionIdFrom, int transactionIdTo, decimal creditToMove, ICollection<string> validationErrors) {

//            ValidateTransactionsToMove(
//                transactionIdFrom,
//                transactionIdTo,
//                validationErrors,
//                out var transactionFrom,
//                out var transactionTo);

//            if (validationErrors.Any()) {
//                return false;
//            }

//            if (creditToMove > transactionFrom.Credit) {
//                validationErrors.Add($"Credit to move must be less than or equal to transaction from credit {transactionFrom.Credit}.");
//                return false;
//            }

//            transactionFrom.Credit -= creditToMove;
//            transactionTo.Credit += creditToMove;
//            return true;
//        }

//        private void ValidateTransactionsToMove(
//            int transactionIdFrom,
//            int transactionIdTo,
//            ICollection<string> validationErrors,
//            out Transaction transactionFrom,
//            out Transaction transactionTo) {

//            ValidateTransactionToMove(transactionIdFrom, "from", validationErrors, out transactionFrom);
//            ValidateTransactionToMove(transactionIdTo, "to", validationErrors, out transactionTo);

//            if (validationErrors.Any()) {
//                return;
//            }

//            if (transactionFrom.EffDate != transactionTo.EffDate) {
//                validationErrors.Add($"Transactions must be on the same Date.");
//                return;
//            }

//            void ValidateTransactionToMove(int transactionId, string fromToText, ICollection<string> validationErrors, out Transaction transaction) {

//                transaction = null;

//                if (transactionId == default) {
//                    validationErrors.Add($"Transaction id to move {fromToText} must be provided");
//                    return;
//                }

//                var idExists = _TransactionRepository.Any(transactionId);
//                if (!idExists) {
//                    validationErrors.Add($"Transaction id to move {fromToText} does not exist");
//                    return;
//                }

//                transaction = _TransactionRepository.Get(transactionId);
//                if (transaction.IsWage == false) {
//                    validationErrors.Add($"Transaction {transactionId} is not a wage.");
//                }

//                return;
//            }
//        }
//    }
//}
