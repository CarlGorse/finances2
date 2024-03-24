using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Dto;
using finances.api.Enums;
using finances.api.Logic;
using finances.api.Models;
using finances.api.Repositories;
using System;
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

        private const int _pageSize = 15;

        public TransactionSearchResult Get(SearchCriteriaModel searchCriteria) {

            var errors = new List<string>();
            var pageCount = 0;
            IEnumerable<Transaction> pagedTransactions = [];
            ServiceResult serviceResult;

            try {
                if (!_searchCriteriaService.ValidateSearchCriteria(searchCriteria, errors)) {
                    serviceResult = ServiceResult.Invalid;
                }
                else {

                    var transactions = _reportService.GetTransactionsWithRunningTotals(searchCriteria);

                    foreach (var transaction in transactions) {
                        _transactionRepository.SetWageTotalForEffDate(transaction);
                    }

                    pagedTransactions = PagingLogic.GetPagedItems(transactions.ToList(), _pageSize, searchCriteria.PageNo);

                    pageCount = PagingLogic.GetPageCount(transactions.Count(), _pageSize);

                    serviceResult = ServiceResult.Ok;
                }
            }
            catch (Exception ex) {
                serviceResult = ServiceResult.Error;
                errors.Add(ex.Message);
            }

            return new TransactionSearchResult {
                PageCount = pageCount,
                SearchCriteria = searchCriteria,
                Result = serviceResult,
                Transactions = pagedTransactions
            };
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

        public ServiceResult MoveWages(
            MoveWagesModel model,
            out ICollection<string> validationErrors,
            out Transaction transactionFrom,
            out Transaction transactionTo) {

            validationErrors = [];

            ValidateTransactionsToMove(
                model.TransactionIdFrom,
                model.TransactionIdTo,
                validationErrors,
                out transactionFrom,
                out transactionTo);

            if (validationErrors.Count > 0) {
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

        private void ValidateTransactionsToMove(
            int transactionIdFrom,
            int transactionIdTo,
            ICollection<string> validationErrors,
            out Transaction transactionFrom,
            out Transaction transactionTo) {

            ValidateTransactionToMove(transactionIdFrom, "from", validationErrors, out transactionFrom);
            ValidateTransactionToMove(transactionIdTo, "to", validationErrors, out transactionTo);

            if (validationErrors.Count == 0) {
                return;
            }

            if (transactionFrom.EffDate != transactionTo.EffDate) {
                validationErrors.Add($"Transactions must be on the same Date.");
                return;
            }
        }

        private void ValidateTransactionToMove(
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
}
