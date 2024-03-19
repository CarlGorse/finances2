using finances.api.Data.Models;
using finances.api.Enums;
using finances.api.Models;
using System.Collections.Generic;

namespace finances.api.Services {
    public interface ITransactionManagementService {
        ServiceResult Get(SearchCriteriaModel searchCriteria, out ICollection<string> validationErrors, out IEnumerable<TransactionRunningTotal> transactions);
        ServiceResult Add(Transaction transaction, out ICollection<string> validationErrors);
        ServiceResult Delete(IEnumerable<int> ids, out ICollection<string> validationErrors);
        ServiceResult Edit(Transaction transaction, out ICollection<string> validationErrors);
        ServiceResult MoveWages(MoveWagesModel model, out ICollection<string> validationErrors, out Transaction transactionFrom, out Transaction transactionDo);
    }
}