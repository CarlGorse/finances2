using finances.api.Data.Models;
using finances.api.Logic;
using finances.api.Models;
using finances.api.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace finances.api.Services {

    public class ReportService(
        IReportTotalRepository reportTotalsRepository,
        IAccountRepository accountRepository,
        ICategoryRepository categoryRepository,
        ICategoryGroupRepository categoryGroupRepository,
        ITransactionRepository transactionRepository) : IReportService {

        private readonly IAccountRepository _AccountRepository = accountRepository;
        private readonly ICategoryRepository _CategoryRepository = categoryRepository;
        private readonly ICategoryGroupRepository _CategoryGroupRepository = categoryGroupRepository;
        private readonly IReportTotalRepository _ReportTotalRepository = reportTotalsRepository;
        private readonly ITransactionRepository _TransactionRepository = transactionRepository;

        public IEnumerable<CategoryTotal> GetCategoryTotals(TransactionFilters transactionFilters) {

            var parameters =
                $"{FormatSpParameterValue(transactionFilters.StartYear.ToString())}," +
                $"{FormatSpParameterValue(transactionFilters.StartPeriod.ToString())}," +
                $"{FormatSpParameterValue(transactionFilters.EndYear.ToString())}," +
                $"{FormatSpParameterValue(transactionFilters.EndPeriod.ToString())}," +
                $"{FormatSpParameterValue((transactionFilters.CategoryIds.Count == 0 ? default : transactionFilters.CategoryIds.First().ToString()))}";

            // Use AsNoTracking to ensure latest data is always downloaded to client (AsNoTracking works out whether to do this)
            // A side-effect of this is that linked data isn't returned so need to set this manually :(
            var reportTotals = (from rta in _ReportTotalRepository.ReportTotalsByCategory(parameters)
                                select rta)
                                .ToList();

            var reportTotalsOrdered = from rt in reportTotals
                                      join c in _CategoryRepository.Categories on rt.ItemId equals c.CategoryId
                                      join cg in _CategoryGroupRepository.CategoryGroups on c.GroupId equals cg.CategoryGroupId
                                      orderby cg.DisplayOrder, c.GroupDisplayOrder, rt.Year, rt.Period
                                      select rt;

            foreach (var reportTotal in reportTotalsOrdered) {
                reportTotal.Category = _CategoryRepository.Get(reportTotal.CategoryId);
            }

            return reportTotalsOrdered;
        }

        public IEnumerable<AccountTotal> GetAccountTotals(
            int? startYear = null,
            int? startPeriod = null,
            int? endYear = null,
            int? endPeriod = null,
            int? accountId = null) {

            var parameters = $"{startYear},{startPeriod},{endYear},{endPeriod},{(accountId.ToString() == "" ? "null" : accountId.ToString())}";

            var reportTotals = (from rta in _ReportTotalRepository.ReportTotalsByAccount(parameters)
                                select rta)
                                .ToList();

            var reportTotalsOrdered = (from rt in reportTotals
                                       join a in _AccountRepository.Accounts on rt.AccountId equals a.AccountId
                                       orderby a.DisplayOrder, rt.Year, rt.Period
                                       select rt).ToList();

            foreach (var reportTotal in reportTotalsOrdered) {
                reportTotal.Account = _AccountRepository.Get(reportTotal.AccountId);
            }

            return reportTotalsOrdered;
        }

        public IEnumerable<Transaction> GetTransactionsWithRunningTotals(SearchCriteriaModel searchCriteria) {

            var transactionFilters = CreateTransactionFilters(searchCriteria);

            var transactions = _TransactionRepository.Get(transactionFilters);

            var runningTotalQueryParams =
                $"{FormatSpParameterValue(transactionFilters.AccountId.ToString())}," +
                $"{FormatSpParameterValue(transactionFilters.StartYear.ToString())}," +
                $"{FormatSpParameterValue(transactionFilters.StartPeriod.ToString())}," +
                $"{FormatSpParameterValue(transactionFilters.EndYear.ToString())}," +
                $"{FormatSpParameterValue(transactionFilters.EndPeriod.ToString())}";

            var reportTotals = (from rta in _ReportTotalRepository.ReportTransactionRunningTotals(runningTotalQueryParams)
                                select rta).ToList();

            foreach (var transaction in transactions) {
                transaction.RunningTotal = reportTotals.Single(x => x.TransactionId == transaction.TransactionId);
            }

            return transactions
                    .OrderByDescending(x => x.Year)
                    .ThenByDescending(x => x.Period)
                    .ThenByDescending(x => x.EffDate)
                    .ThenByDescending(x => !x.IsWage)
                    .ThenBy(x => x.Category.Group.Name)
                    .ThenBy(x => x.Category.Name);
        }

        private static TransactionFilters CreateTransactionFilters(SearchCriteriaModel searchCriteria) {

            var transactionFilters = new TransactionFilters {
                AccountId = searchCriteria.AccountId,
                StartYear = searchCriteria.StartYear,
                StartPeriod = searchCriteria.StartPeriod,
                EndYear = searchCriteria.EndYear,
                EndPeriod = searchCriteria.EndPeriod
            };

            return transactionFilters;
        }

        private static string FormatSpParameterValue(string text) {
            if (DateTime.TryParse(text, out _)) {
                text = $"'{Convert.ToDateTime(text):yyyy-MM-dd}'";
            }

            var formattedValue = text == null || text == string.Empty ? "null" : text;
            return formattedValue;
        }
    }
}
