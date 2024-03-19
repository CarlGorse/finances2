using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Enums;
using finances.api.Logic;
using finances.api.Models;
using finances.api.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Services {

    public class TransactionManagementService(
        IEditableItemControllerService<Transaction> controllerService,
        IFinancesDbContext dbContext,
        ISearchCriteriaService searchCriteriaService,
        ITransactionRepository transactionRepository,
        IReportService reportService) : ITransactionManagementService {

        private readonly IEditableItemControllerService<Transaction> _controllerService = controllerService;
        private readonly IFinancesDbContext _dbContext = dbContext;
        private readonly IReportService _reportService = reportService;
        private readonly ISearchCriteriaService _searchCriteriaService = searchCriteriaService;
        private readonly ITransactionRepository _transactionRepository = transactionRepository;

        public ServiceResult Get(SearchCriteriaModel searchCriteria,
            out ICollection<string> validationErrors,
            out IEnumerable<TransactionRunningTotal> transactions) {

            validationErrors = [];
            transactions = [];

            if (!_searchCriteriaService.ValidateSearchCriteria(searchCriteria, validationErrors)) {
                return ServiceResult.Invalid;
            }

            var transactionFilters = _createTransactionFilters(searchCriteria);

            transactions = _reportService.GetTransactionTotals(transactionFilters);

            foreach (var reportRow in transactions) {
                _transactionRepository.SetWageTotalForEffDate(reportRow.Transaction);
            }

            return ServiceResult.Ok;
        }

        public ServiceResult Add(Transaction transaction, out ICollection<string> validationErrors) {
            return _controllerService.Add(transaction, out validationErrors);
        }

        public ServiceResult Edit(Transaction transaction, out ICollection<string> validationErrors) {
            return _controllerService.Edit(transaction, out validationErrors);
        }

        public ServiceResult Delete(IEnumerable<int> ids, out ICollection<string> validationErrors) {
            return _controllerService.Delete(ids, out validationErrors);
        }

        public ServiceResult MoveWages(MoveWagesModel model, out ICollection<string> validationErrors) {

            validationErrors = new List<string>();

            _validateTransactionsToMove(
                model.TransactionIdFrom,
                model.TransactionIdTo,
                validationErrors,
                out var transactionFrom,
                out var transactionTo);

            if (validationErrors.Any()) {
                return ServiceResult.Invalid;
            }

            if (model.CreditToMove > transactionFrom.Credit) {
                return ServiceResult.Invalid;
            }

            transactionFrom.Credit -= model.CreditToMove;
            transactionTo.Credit += model.CreditToMove;

            _dbContext.SaveChanges();

            return ServiceResult.Ok;
        }

        private void _validateTransactionsToMove(
            int transactionIdFrom,
            int transactionIdTo,
            ICollection<string> validationErrors,
            out Transaction transactionFrom,
            out Transaction transactionTo) {

            ValidateTransactionToMove(transactionIdFrom, "from", validationErrors, out transactionFrom);
            ValidateTransactionToMove(transactionIdTo, "to", validationErrors, out transactionTo);

            if (validationErrors.Any()) {
                return;
            }

            if (transactionFrom.EffDate != transactionTo.EffDate) {
                validationErrors.Add($"Transactions must be on the same Date.");
                return;
            }

            void ValidateTransactionToMove(
                int transactionId,
                string fromToText,
                ICollection<string> validationErrors,
                out Transaction transaction) {

                transaction = null;

                if (transactionId == default) {
                    validationErrors.Add($"Transaction id to move {fromToText} must be provided");
                    return;
                }

                var idExists = _transactionRepository.Any(transactionId);
                if (!idExists) {
                    validationErrors.Add($"Transaction id to move {fromToText} does not exist");
                    return;
                }

                transaction = _transactionRepository.Get(transactionId);
                if (transaction.IsWage == false) {
                    validationErrors.Add($"Transaction {transactionId} is not a wage.");
                }

                return;
            }
        }

        private TransactionFilters _createTransactionFilters(SearchCriteriaModel searchCriteria) {

            var transactionFilters = new TransactionFilters();
            switch (searchCriteria.FilterType) {

                case SearchCriteriaModel.FilterTypes.EffDate:
                    transactionFilters.StartEffDate = searchCriteria.StartEffDate;
                    transactionFilters.EndEffDate = searchCriteria.EndEffDate;
                    break;

                case SearchCriteriaModel.FilterTypes.YearAndPeriod:
                    transactionFilters.StartYear = searchCriteria.StartYear;
                    transactionFilters.StartPeriod = searchCriteria.StartPeriod;
                    transactionFilters.EndYear = searchCriteria.EndYear;
                    transactionFilters.EndPeriod = searchCriteria.EndPeriod;
                    break;

                case SearchCriteriaModel.FilterTypes.TransactionId:
                    transactionFilters.TransactionId = searchCriteria.TransactionId;
                    break;

            }

            transactionFilters.AccountId = searchCriteria.AccountId;

            if (searchCriteria.CategoryId > 0) {
                transactionFilters.CategoryIds.Add(searchCriteria.CategoryId);
            }

            return transactionFilters;
        }
    }
}
