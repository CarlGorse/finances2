using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Dtos;
using finances.api.Functions;
using finances.api.Logic;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Repositories {

    public class TransactionRepository : EditableItemRepository<Transaction>, ITransactionRepository {

        private readonly IAccountRepository _AccountRepository;
        private readonly ICategoryRepository _CategoryRepository;

        public TransactionRepository(
            IFinancesDbContext dbContext,
            IAccountRepository accountRepository,
            ICategoryRepository categoryRepository,
            IItemProperties<Transaction> itemProperties) : base(
                dbContext.Transactions,
                dbContext,
                itemProperties) {

            _AccountRepository = accountRepository;
            _CategoryRepository = categoryRepository;
        }

        protected override IQueryable<Transaction> ItemsQuery() {
            return _DbContext.Transactions
                .Include(x => x.Category)
                .Include(x => x.Category.Group)
                .Include(x => x.Account);
        }

        public decimal GetTotalCreditForWageTransaction(Transaction transaction) {
            var wageTransactions = GetMatchingWageTransactions(transaction)?.ToList();
            return wageTransactions.ToList().Select(t => t.Credit).Sum();
        }

        public IEnumerable<Transaction> GetMatchingWageTransactions(Transaction transaction) {

            if (transaction == null) {
                return new List<Transaction>().AsQueryable();
            }

            var transactions = Get(t =>
                t.IsWage == true
                && t.AccountId == transaction.AccountId
                && t.EffDate == transaction.EffDate
            );

            return transactions;
        }

        public IEnumerable<Transaction> GetTransactionsByFilters(TransactionFilters transactionFilters) {

            var query = Transactions

                .Where(t => transactionFilters.CategoryIds.Count == 0 || transactionFilters.CategoryIds.Contains(t.CategoryId))
                .Where(t => transactionFilters.Descriptions.Count == 0 || transactionFilters.Descriptions.Contains(t.Description ?? string.Empty))
                .Where(t => transactionFilters.Items.Count == 0 || transactionFilters.Items.Contains(t.Item ?? string.Empty))

                .Where(t => transactionFilters.TransactionId == null || transactionFilters.TransactionId == t.TransactionId)
                .Where(t => transactionFilters.AccountId == null || transactionFilters.AccountId == t.AccountId)
                .Where(t => transactionFilters.StartYear == null || transactionFilters.StartYear <= t.Year)
                .Where(t => transactionFilters.StartPeriod == null || transactionFilters.StartPeriod <= t.Period)
                .Where(t => transactionFilters.EndYear == null || transactionFilters.EndYear >= t.Year)
                .Where(t => transactionFilters.EndPeriod == null || transactionFilters.EndPeriod >= t.Period)
                .Where(t => transactionFilters.StartEffDate == null || transactionFilters.StartEffDate <= t.EffDate)
                .Where(t => transactionFilters.EndEffDate == null || transactionFilters.EndEffDate >= t.EffDate)
                .Where(t => transactionFilters.Exclude == null || transactionFilters.Exclude == t.Exclude)
                .Where(t => transactionFilters.IsWage == null || transactionFilters.IsWage == t.IsWage)
                .Where(t => transactionFilters.DateModifiedFrom == null || transactionFilters.DateModifiedFrom <= t.DateModified)
                .Where(t => transactionFilters.DateModifiedTo == null || transactionFilters.DateModifiedTo >= t.DateModified)
            ;

            var transactions = query.ToList();

            return transactions;
        }

        private IEnumerable<Transaction> Transactions => Items;

        public override IValidationResult IsValid(Transaction transaction) {

            var context = "Invalid transaction";

            if (transaction == null) {
                return new ValidationResultFalse(context, "Transaction is empty");
            }

            if (!_AccountRepository.Any(transaction.AccountId)) {
                return new ValidationResultFalse(context, "Unknown account");
            }

            if (!_CategoryRepository.Any(transaction.CategoryId)) {
                return new ValidationResultFalse(context, "Unknown category");
            }

            var validationResult = DecimalFunctions.IsValidCurrency(context, "Credit", transaction.Credit);
            if (!validationResult.IsValid) {
                return validationResult;
            }

            validationResult = DecimalFunctions.IsValidCurrency(context, "Debit", transaction.Debit);
            if (!validationResult.IsValid) {
                return validationResult;
            }

            validationResult = DateTimeFunctions.IsAValidDateTime(context, transaction.EffDate);
            if (!validationResult.IsValid) {
                return validationResult;
            }

            if (transaction.IsWage && transaction.Debit > 0) {
                return new ValidationResultFalse(context, "Debit cannot be set for a wage");
            }

            return new ValidationResultTrue();
        }

        public override void CopyValues(Transaction existingItem, Transaction newValues) {

            if (newValues == null) {
                return;
            }

            if (newValues.AccountId > 0 && newValues.AccountId != existingItem.AccountId) {
                existingItem.AccountId = newValues.AccountId;
            }

            if (newValues.CategoryId > 0 && newValues.CategoryId != existingItem.CategoryId) {
                existingItem.CategoryId = newValues.CategoryId;
            }

            if (newValues.EffDate > new DateTime(1900, 1, 1) && newValues.EffDate != existingItem.EffDate) {
                existingItem.EffDate = newValues.EffDate;
            }

            if (newValues.Description?.Length > 0 && newValues.Description != existingItem.Description) {
                existingItem.Description = newValues.Description;
            }

            if (newValues.Item?.Length > 0 && newValues.Item != existingItem.Item) {
                existingItem.Item = newValues.Item;
            }

            if (newValues.Credit != existingItem.Credit) {
                existingItem.Credit = newValues.Credit;
            }

            if (newValues.Debit != existingItem.Debit) {
                existingItem.Debit = newValues.Debit;
            }

            if (newValues.IsWage != existingItem.IsWage) {
                existingItem.IsWage = newValues.IsWage;
            }

            if (newValues.Exclude != existingItem.Exclude) {
                existingItem.Exclude = newValues.Exclude;
            }
        }

        public void SetWageTotalForEffDate(Transaction transaction) {

            if (!transaction.IsWage) {
                return;
            }

            transaction.WageTotalForEffDate = GetTotalCreditForWageTransaction(transaction);

            if (!Any(transaction.TransactionId)) {
                transaction.WageTotalForEffDate += transaction.Credit;
            }
        }
    }
}