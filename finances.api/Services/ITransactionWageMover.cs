using finances2.api.Data.Models;
using finances2.api.Dto;
using finances2.api.Enums;
using System.Collections.Generic;

namespace finances2.api.Services {
    public interface ITransactionWageMover {
        ServiceResult MoveWages(MoveWagesModel model, out ICollection<string> validationErrors, out Transaction transactionFrom, out Transaction transactionTo);
    }
}