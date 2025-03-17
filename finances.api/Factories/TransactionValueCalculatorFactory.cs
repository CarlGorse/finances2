using finances.api.Enums;
using finances2.api.Data.Models;

namespace finances.api.Factories {
    public class TransactionValueCalculatorFactory : ITransactionValueCalculatorFactory {
        public Delegates.TransactionValueCalculator Create(Enums.TeasactionValueCalculatorTypes type) {

            return type switch {
                TeasactionValueCalculatorTypes.Total => (Transaction t) => t.Credit - t.Debit,
                TeasactionValueCalculatorTypes.Debit => (Transaction t) => t.Debit,
                TeasactionValueCalculatorTypes.Credit => (Transaction t) => t.Credit,
                _ => (Transaction t) => 0
            };
        }
    }
}
