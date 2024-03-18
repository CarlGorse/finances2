using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace finances.api.Services {

    public class EditableItemControllerService<T>(
        IEditableItemRepository<T> editableItemRepository,
        IFinancesDbContext dbContext,
        ITransactionRepository transactionRepository
        ) : IEditableItemControllerService<T> where T : class, IEditableItem<T> {

        private readonly IEditableItemRepository<T> _editableItemRepository = editableItemRepository;
        private readonly IFinancesDbContext _dbContext = dbContext;
        private readonly ITransactionRepository _transactionRepository = transactionRepository;

        public IStatusCodeActionResult Get(IEnumerable<int> ids) {

            var items = _editableItemRepository.Get(ids);

            if (!items.Any()) {

                var value = JsonSerializer.Serialize(new {
                    ids,
                    validationErrors = new List<string> { $"Unknown {T.TypeDescription}" }
                }
                );

                return new ObjectResult(value) {
                    StatusCode = StatusCodes.Status406NotAcceptable
                };
            }

            return new OkObjectResult(new { items });
        }

        public IStatusCodeActionResult Add(T item) {

            var result = _editableItemRepository.Add(item, out var validationErrors, saveChanges: true);

            return result switch {
                EditResult.Invalid => new ObjectResult(JsonSerializer.Serialize(new { item, validationErrors })) {
                    StatusCode = StatusCodes.Status400BadRequest
                },
                EditResult.Error => new ObjectResult(item) {
                    StatusCode = StatusCodes.Status500InternalServerError
                },
                _ => new OkObjectResult(item),
            };
        }

        public IStatusCodeActionResult Edit(T item) {

            var result = _editableItemRepository.Edit(item, out var validationErrors, out var updatedItem);

            return result switch {
                EditResult.Invalid => new ObjectResult(JsonSerializer.Serialize(new { updatedItem, validationErrors })) {
                    StatusCode = StatusCodes.Status400BadRequest
                },
                EditResult.Error => new ObjectResult(item) {
                    StatusCode = StatusCodes.Status500InternalServerError
                },
                _ => new OkObjectResult(updatedItem),
            };
        }

        public IStatusCodeActionResult Delete(IEnumerable<int> ids) {

            var result = _editableItemRepository.Delete(ids, out var validationErrors);

            return result switch {
                EditResult.Invalid => new ObjectResult($"{string.Join(". ", validationErrors)}.") {
                    StatusCode = StatusCodes.Status400BadRequest
                },
                EditResult.Error => new ObjectResult(ids) {
                    StatusCode = StatusCodes.Status500InternalServerError
                },
                _ => new OkObjectResult(new { ids }),
            };
        }

        public IStatusCodeActionResult MoveWages(int transactionIdFrom, int transactionIdTo, decimal creditToMove) {

            var validationErrors = new List<string>();

            _validateTransactionsToMove(
                transactionIdFrom,
                transactionIdTo,
                validationErrors,
                out var transactionFrom,
                out var transactionTo);

            if (validationErrors.Any()) {
                return new ObjectResult(JsonSerializer.Serialize(new { transactionIdFrom, transactionIdTo, creditToMove, validationErrors })) {
                    StatusCode = StatusCodes.Status406NotAcceptable
                };
            }

            if (creditToMove > transactionFrom.Credit) {
                validationErrors.Add($"Credit to move must be less than or equal to transaction from credit {transactionFrom.Credit}.");
                return new ObjectResult(JsonSerializer.Serialize(new { transactionIdFrom, transactionIdTo, creditToMove, validationErrors })) {
                    StatusCode = StatusCodes.Status406NotAcceptable
                };
            }

            transactionFrom.Credit -= creditToMove;
            transactionTo.Credit += creditToMove;

            _dbContext.SaveChanges();

            return new OkObjectResult(new { transactionFrom, transactionTo, creditToMove });
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

            void ValidateTransactionToMove(int transactionId, string fromToText, ICollection<string> validationErrors, out Transaction transaction) {

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
}
