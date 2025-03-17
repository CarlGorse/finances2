using finances2.api.Data.Models;
using finances2.api.Enums;
using System.Collections.Generic;

namespace finances2.api.Services {
    public interface ITransactionManagementService {
        ServiceResult Add(Transaction transaction, out ICollection<string> validationErrors);
        ServiceResult Delete(IEnumerable<int> ids, out ICollection<string> validationErrors);
        ServiceResult Edit(Transaction transaction, out ICollection<string> validationErrors);
    }
}