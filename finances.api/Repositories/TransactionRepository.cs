using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Functions;
using finances.api.Logic;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace finances.api.Repositories {

    public class TransactionRepository(
        IFinancesDbContext dbContext,
        IAccountRepository accountRepository,
        ICategoryRepository categoryRepository) : EditableItemRepository<Transaction>(
            dbContext.Transactions,
            dbContext), ITransactionRepository {

        private readonly IAccountRepository _AccountRepository = accountRepository;
        private readonly ICategoryRepository _CategoryRepository = categoryRepository;

        protected override IQueryable<Transaction> ItemsQuery() {
            return _dbContext.Transactions
                    .Where(x => x.Exclude == false)
                    .Include(x => x.Category)
                    .Include(x => x.Category.Group)
                    .Include(x => x.Account);
        }

        public IQueryable<Transaction> Get(DateOnly startDate, DateOnly endDate) {
            return ItemsQuery().Where(x =>
                    x.EffDate >= startDate
                    && x.EffDate <= endDate);
        }

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

            validationResult = DateTimeFunctions.IsAValidDateTime(context, transaction.EffDate.ToString());
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

            if (newValues.EffDate != existingItem.EffDate) {
                existingItem.EffDate = newValues.EffDate;
            }

            if (newValues.Description?.Length > 0 && newValues.Description != existingItem.Description) {
                existingItem.Description = newValues.Description;
            }

            if (newValues.Item != existingItem.Item) {
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
        }
    }
}