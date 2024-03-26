using finances.api.Comparers;
using finances.api.Data.Models;
using finances.api.Dto;
using finances.api.Enums;
using finances.api.Logic;
using finances.api.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Services {

    public class TransactionGetter(
        ISearchCriteriaService searchCriteriaService,
        ITransactionRepository transactionRepository,
        IYearAndPeriodService yearAndPeriodService) : ITransactionGetter {

        private readonly ISearchCriteriaService _searchCriteriaService = searchCriteriaService;
        private readonly ITransactionRepository _transactionRepository = transactionRepository;
        private readonly IYearAndPeriodService _yearAndPeriodService = yearAndPeriodService;

        private const int _pageSize = 100;

        public TransactionSearchResult Get(
            SearchCriteria searchCriteria,
            int pageNo,
            bool includeWageTotals,
            bool includeRunningTotals) {

            List<string> errors = [];
            var pageCount = 0;
            ICollection<Transaction> transactionsOutput = [];
            ServiceResult serviceResult;

            try {

                if (pageNo < 0) {
                    errors.Add($"PageNo must not be negative.");
                }

                _searchCriteriaService.ValidateSearchCriteria(searchCriteria, errors);

                if (errors.Count > 0) {
                    serviceResult = ServiceResult.Invalid;
                }
                else {

                    var transactionsForSearchCriteria = _transactionRepository.Get(x =>
                        x.EffDate.Year >= searchCriteria.StartYear
                        && x.EffDate.Year <= searchCriteria.EndYear
                        && x.EffDate.Month >= searchCriteria.StartPeriod
                        && x.EffDate.Month <= searchCriteria.EndPeriod
                        && x.AccountId == searchCriteria.AccountId);

                    if (includeRunningTotals) {
                        SetRunningTotals(transactionsForSearchCriteria, searchCriteria);
                    }

                    if (pageNo > 0) {
                        transactionsOutput = PagingLogic.GetPagedItems(
                            transactionsForSearchCriteria.ToList(),
                            _pageSize,
                            pageNo).ToList();

                        pageCount = PagingLogic.GetPageCount(transactionsForSearchCriteria.Count, _pageSize);
                    }
                    else {
                        transactionsOutput = transactionsForSearchCriteria;
                    }

                    if (includeWageTotals) {
                        SetWageTotals(transactionsOutput);
                    }

                    serviceResult = ServiceResult.Ok;
                }
            }
            catch (Exception ex) {
                serviceResult = ServiceResult.Error;
                errors.Add(ex.Message);
            }

            return new TransactionSearchResult {
                PageCount = pageCount,
                Result = serviceResult,
                Transactions = transactionsOutput
            };
        }

        private static void SetWageTotals(ICollection<Transaction> transactions) {

            foreach (var transaction in transactions.Where(x => x.IsWage)) {

                var wageTransactionsOnSameDate = transactions.Where(x =>
                    x.IsWage == true
                    && x.AccountId == transaction.AccountId
                    && x.EffDate == transaction.EffDate
                );

                transaction.WageTotal = wageTransactionsOnSameDate.Sum(x => x.Credit);
            }
        }//

        private void SetRunningTotals(ICollection<Transaction> transactions, SearchCriteria searchCriteria) {

            var transactionComparer = new TransactionComparer();

            var previousYearAndPeriod = _yearAndPeriodService.GetPreviousYearAndPeriod(new YearAndPeriod(searchCriteria.StartYear, searchCriteria.StartPeriod));

            var previousTransactions = _transactionRepository.Get(x =>
                x.EffDate.Year <= previousYearAndPeriod.Year
                && x.EffDate.Month <= previousYearAndPeriod.Period);

            var previousTransactionRunningTotal = previousTransactions.Sum(x => x.Credit) - previousTransactions.Sum(x => x.Debit);

            var firstTransaction = transactions.ElementAt(0);
            firstTransaction.AccountRunningTotal = previousTransactionRunningTotal
                                                    + firstTransaction.Credit
                                                    - firstTransaction.Debit;

            var previousTransaction = firstTransaction;

            for (var x = 1; x < transactions.Count; x++) {
                var transaction = transactions.ElementAt(x);
                transaction.AccountRunningTotal = previousTransaction.AccountRunningTotal
                                                    + transaction.Credit
                                                    - transaction.Debit;
            }
        }
    }
}
