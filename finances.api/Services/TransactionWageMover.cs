using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Dto;
using finances.api.Enums;
using finances.api.Repositories;
using System.Collections.Generic;

namespace finances.api.Services {

    public class TransactionWageMover(
        IFinancesDbContext dbContext,
        ITransactionRepository transactionRepository) : ITransactionWageMover {

        private readonly IFinancesDbContext _dbContext = dbContext;
        private readonly ITransactionRepository _transactionRepository = transactionRepository;

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
        }
    }
}
