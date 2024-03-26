using finances.api.Data.Models;
using finances.api.Dto;
using finances.api.Enums;
using System.Collections.Generic;

namespace finances.api.Services {
    public interface ITransactionWageMover {
        ServiceResult MoveWages(MoveWagesModel model, out ICollection<string> validationErrors, out Transaction transactionFrom, out Transaction transactionTo);
    }
}