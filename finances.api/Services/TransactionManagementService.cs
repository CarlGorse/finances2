using finances.api.Data.Models;
using finances.api.Enums;
using System.Collections.Generic;

namespace finances.api.Services {

    public class TransactionManagementService(
        IEditableItemManagementService<Transaction> itemManagementService
        ) : ITransactionManagementService {

        private readonly IEditableItemManagementService<Transaction> _itemManagementService = itemManagementService;

        public ServiceResult Add(Transaction transaction, out ICollection<string> validationErrors) {
            return _itemManagementService.Add(transaction, out validationErrors);
        }

        public ServiceResult Edit(Transaction transaction, out ICollection<string> validationErrors) {
            return _itemManagementService.Edit(transaction, out validationErrors);
        }

        public ServiceResult Delete(IEnumerable<int> ids, out ICollection<string> validationErrors) {
            return _itemManagementService.Delete(ids, out validationErrors);
        }
    }
}
