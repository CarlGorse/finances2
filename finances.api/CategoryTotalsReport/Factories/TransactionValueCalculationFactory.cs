using finances.api.CategoryTotalsReport.Delegates;
using finances.api.CategoryTotalsReport.Enums;

namespace finances.api.CategoryTotalsReport.Factories {
    public class TransactionValueCalculationFactory : ITransactionValueCalculaionFactory {
        public TransactionValueCalculation Create(TeasactionValueCalculationTypes calculationType) {

            return calculationType switch {
                TeasactionValueCalculationTypes.Total => (t) => t.Credit - t.Debit,
                TeasactionValueCalculationTypes.Debit => (t) => t.Debit,
                TeasactionValueCalculationTypes.Credit => (t) => t.Credit,
                _ => (t) => 0
            };
        }
    }
}
