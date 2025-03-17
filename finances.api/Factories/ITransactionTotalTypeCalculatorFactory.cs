using finances.api.Delegates;
using finances.api.Enums;

namespace finances.api.Factories {
    public interface ITransactionTotalTypeCalculatorFactory {
        TransactionTotalTypeCalculator Create(TransactionTotalCalculatorTypes type);
    }
}