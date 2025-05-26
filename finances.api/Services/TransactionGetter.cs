using finances.api.CategoryTotalsReport.Dto;
using finances.api.Logic;
using finances.api.Services.Interfaces;
using finances2.api.Comparers;
using finances2.api.Data.Models;
using finances2.api.Enums;
using finances2.api.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Services {

    public class TransactionGetter(
        IYearAndPeriodSearchValidator searchCriteriaService,
        ITransactionRepository transactionRepository,
        IYearAndPeriodUtiltities yearAndPeriodService) : ITransactionGetter {

        private readonly IYearAndPeriodSearchValidator _searchCriteriaService = searchCriteriaService;
        private readonly ITransactionRepository _transactionRepository = transactionRepository;
        private readonly IYearAndPeriodUtiltities _yearAndPeriodService = yearAndPeriodService;

        public TransactionSearchResultDTO Get(GetTransactionsParamsDTO parms) {

            List<string> errors = [];
            var pageCount = 0;
            ICollection<Transaction> transactionsToReturn = [];
            ServiceResult serviceResult;
            var transactionCount = 0;

            var pageNo = parms.PageNo > 0 ? parms.PageNo : 1;
            var pageSize = parms.PageSize;

            try {

                _searchCriteriaService.Validate(parms.YearAndPeriodSearch, errors);

                if (errors.Count > 0) {
                    serviceResult = ServiceResult.Invalid;
                }
                else {

                    var filteredTransactions = _transactionRepository.Get(parms.AccountId, parms.YearAndPeriodSearch);

                    var orderedTransactions = filteredTransactions
                                                .OrderByDescending(x => x.EffDate)
                                                .ThenBy(x => x.IsWage ? $"{x.Category.Group.Name} | {x.Category.Name}" : "")
                                                .ThenByDescending(x => !x.IsWage ? x.Id : 1)
                                                .ToList();

                    if (parms.IncludeRunningTotals) {
                        SetRunningTotals(orderedTransactions, parms.AccountId, parms.YearAndPeriodSearch);
                    }

                    transactionCount = orderedTransactions.Count;

                    transactionsToReturn = orderedTransactions;

                    if (transactionCount > 0 && pageSize > 0 && pageNo > 0) {
                        transactionsToReturn = PagingLogic.GetPagedItems(
                            transactionsToReturn,
                            pageSize,
                            pageNo).ToList();

                        pageCount = PagingLogic.GetPageCount(transactionCount, parms.PageSize);
                    }

                    if (parms.IncludeWageTotals) {
                        SetWageTotals(transactionsToReturn);
                    }

                    serviceResult = ServiceResult.Ok;
                }
            }
            catch (Exception ex) {
                serviceResult = ServiceResult.Error;
                errors.Add(ex.Message);
            }

            return new TransactionSearchResultDTO {
                PageCount = pageCount,
                PageSize = pageSize,
                Result = serviceResult,
                Transactions = transactionsToReturn,
                TotalTransactions = transactionCount
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

        private void SetRunningTotals(IList<Transaction> transactionsOrdered, int accountId, YearAndPeriodSearchDTO yearAndPeriodSearch) {

            if (transactionsOrdered.Count == 0) {
                return;
            }

            var transactionComparer = new TransactionComparer();

            var previousYearAndPeriod = _yearAndPeriodService.GetPreviousYearAndPeriod(new YearAndPeriod(yearAndPeriodSearch.StartYear, yearAndPeriodSearch.StartPeriod));

            var previousTransactions = _transactionRepository.Get(x =>
                x.AccountId == accountId
                && (x.EffDate.Year < previousYearAndPeriod.Year ||
                    (x.EffDate.Year == previousYearAndPeriod.Year && x.EffDate.Month <= previousYearAndPeriod.Period)));

            var previousTransactionRunningTotal = previousTransactions.Sum(x => x.Credit) - previousTransactions.Sum(x => x.Debit);

            var firstTransaction = transactionsOrdered.ElementAt(transactionsOrdered.Count - 1);
            firstTransaction.AccountRunningTotal = previousTransactionRunningTotal
                                                    + firstTransaction.Credit
                                                    - firstTransaction.Debit;

            var previousTransaction = firstTransaction;

            for (var x = transactionsOrdered.Count - 2; x >= 0; x--) {
                var transaction = transactionsOrdered.ElementAt(x);
                transaction.AccountRunningTotal = previousTransaction.AccountRunningTotal
                                                    + transaction.Credit
                                                    - transaction.Debit;
                previousTransaction = transaction;
            }
        }
    }
}
