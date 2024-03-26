using finances.api.Data.Models;
using finances.api.Enums;
using System.Collections.Generic;

namespace finances.api.Services {
    public interface ITransactionManagementService {
        ServiceResult Add(Transaction transaction, out ICollection<string> validationErrors);
        ServiceResult Delete(IEnumerable<int> ids, out ICollection<string> validationErrors);
        ServiceResult Edit(Transaction transaction, out ICollection<string> validationErrors);
    }
}