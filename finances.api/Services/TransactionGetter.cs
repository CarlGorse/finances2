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
        IYearAndPeriodSearchValidationService searchCriteriaService,
        ITransactionRepository transactionRepository,
        IYearAndPeriodService yearAndPeriodService) : ITransactionGetter {

        private readonly IYearAndPeriodSearchValidationService _searchCriteriaService = searchCriteriaService;
        private readonly ITransactionRepository _transactionRepository = transactionRepository;
        private readonly IYearAndPeriodService _yearAndPeriodService = yearAndPeriodService;

        public TransactionSearchResult Get(GetTransactionsParams parms) {

            List<string> errors = [];
            var pageCount = 0;
            ICollection<Transaction> pagedTransactions = [];
            ServiceResult serviceResult;
            var totalTransactions = 0;

            try {

                if (parms.PageNo < 0) {
                    errors.Add($"PageNo must not be negative.");
                }

                if (parms.PageSize <= 0) {
                    errors.Add($"PageSize must be greater than zero.");
                }

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

                    if (parms.PageNo > 0) {
                        pagedTransactions = PagingLogic.GetPagedItems(
                            orderedTransactions.ToList(),
                            parms.PageSize,
                            parms.PageNo).ToList();

                        pageCount = PagingLogic.GetPageCount(orderedTransactions.Count, parms.PageSize);
                    }
                    else {
                        pagedTransactions = orderedTransactions;
                    }

                    totalTransactions = orderedTransactions.Count;

                    if (parms.IncludeWageTotals) {
                        SetWageTotals(pagedTransactions);
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
                Transactions = pagedTransactions,
                TotalTransaxtions = totalTransactions
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

        private void SetRunningTotals(IList<Transaction> transactionsOrdered, int accountId, YearAndPeriodSearch yearAndPeriodSearch) {

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
