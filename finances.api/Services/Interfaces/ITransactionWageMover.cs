using finances.api.CategoryTotalsReport.Dto;
using finances2.api.Data.Models;
using finances2.api.Enums;
using System.Collections.Generic;

namespace finances.api.Services.Interfaces {
    public interface ITransactionWageMover {
        ServiceResult MoveWages(MoveWagesDTO model, out ICollection<string> validationErrors, out Transaction transactionFrom, out Transaction transactionTo);
    }
}