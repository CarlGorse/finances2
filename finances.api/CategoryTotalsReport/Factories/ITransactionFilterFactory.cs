using finances.api.CategoryTotalsReport.Delegates;
using finances.api.CategoryTotalsReport.Enums;

namespace finances.api.CategoryTotalsReport.Factories {
    public interface ITransactionTotalTypeCalculatorFactory {
        TransactionTotalTypeCalculator Create(TransactionTotalCalculatorTypes type);
    }
}