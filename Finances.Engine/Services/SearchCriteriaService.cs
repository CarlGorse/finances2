using Finances.Engine.Data.Repositories.Interfaces;
using Finances.Engine.Extensions.DataTypeExtensions;
using Finances.Engine.Logic;
using Finances.Engine.Models;
using System;
using System.Collections.Generic;

namespace Finances.Engine.Services {

    public class SearchCriteriaService : ISearchCriteriaService {

        private readonly IAccountRepository _AccountRepository;
        private readonly ICategoryRepository _CategoryRepository;

        public SearchCriteriaService(
            IAccountRepository accountRepository,
            ICategoryRepository categoryRepository) {

            _AccountRepository = accountRepository;
            _CategoryRepository = categoryRepository;
        }

        public SearchCriteriaModel CreateDefaultModelSearchCriteria(int periodsToDeductFromStart = 0, int periodsToAddToEnd = 0) {

            var defaultAccount = _AccountRepository.Get(2);

            return new SearchCriteriaModel(
                accounts: _AccountRepository.Accounts, 
                categories: _CategoryRepository.Categories) {

                StartYear = DateTime.Today.AddMonths(-periodsToDeductFromStart).Year,
                StartPeriod = DateTime.Today.AddMonths(periodsToDeductFromStart).Period(),
                EndYear = DateTime.Today.AddMonths(periodsToAddToEnd).Year,
                EndPeriod = DateTime.Today.AddMonths(periodsToAddToEnd).Period(),
                AccountId = defaultAccount.AccountId,
                StartEffDate = DateTime.Today,
                EndEffDate = DateTime.Today,
                FilterType = SearchCriteriaModel.FilterTypes.YearAndPeriod
            };
        }

        public bool ValidateSearchCriteria(SearchCriteriaModel searchCriteria, List<string> validationErrors) {

            switch (searchCriteria.FilterType) {

                case SearchCriteriaModel.FilterTypes.YearAndPeriod:
                    if (searchCriteria.StartYear > searchCriteria.EndYear) {
                        validationErrors.Add("End Year must not be before Start Year.");
                        return false;
                    }
                    else if (searchCriteria.StartYear == searchCriteria.EndYear
                        && searchCriteria.StartPeriod > searchCriteria.EndPeriod) {
                        validationErrors.Add("End Year/Period must not be before Start Year/Period.");
                        return false;
                    }

                    break;

                case SearchCriteriaModel.FilterTypes.EffDate:
                    if ((searchCriteria.FilterType == SearchCriteriaModel.FilterTypes.EffDate) && (searchCriteria.StartEffDate > searchCriteria.EndEffDate)) {
                        validationErrors.Add("End Eff Date must not be beforeStart Eff Date.");
                        return false;
                    }

                    break;

                case SearchCriteriaModel.FilterTypes.TransactionId:
                    if (!(searchCriteria.TransactionId > 0)) {
                        validationErrors.Add("A transaction Id must be provided.");
                        return false;
                    }

                    break;

            }

            return true;
        }

        public IEnumerable<(int Year, int Period)> CalculateYearsAndPeriodsWithInSearchCriteria(SearchCriteriaModel searchCriteria) {
            var yearsAndPeriods = new List<(int, int)>();

            return searchCriteria.FilterType switch {
                SearchCriteriaModel.FilterTypes.EffDate => yearsAndPeriods,
                SearchCriteriaModel.FilterTypes.YearAndPeriod => CalculateYearsAndPeriodsBetweenStartAndEnd(
                    searchCriteria.StartYearAndPeriod / 12,
                    (searchCriteria.StartYearAndPeriod % 12) + 1,
                    searchCriteria.EndYearAndPeriod / 12,
                    (searchCriteria.EndYearAndPeriod % 12) + 1),
                _ => yearsAndPeriods,
            };
        }

        public IEnumerable<(int Year, int Period)> CalculateYearsAndPeriodsBetweenStartAndEnd(int startYear, int startPeriod, int endYear, int endPeriod) {
            var yearsAndPeriods = new List<(int, int)>();

            var startYearAndPeriod = (startYear * 12) + startPeriod - 1;
            var endYearAndPeriod = (endYear * 12) + endPeriod - 1;

            for (var yearAndPeriod = startYearAndPeriod; yearAndPeriod <= endYearAndPeriod; yearAndPeriod++) {
                var year = yearAndPeriod / 12;
                var period = yearAndPeriod - (year * 12) + 1;
                yearsAndPeriods.Add((year, period));
            }

            return yearsAndPeriods;
        }

        public TransactionFilters CreateTransactionFiltersFromSearchCriteria(SearchCriteriaModel searchCriteria) {

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

            return transactionFilters;
        }
    }
}
