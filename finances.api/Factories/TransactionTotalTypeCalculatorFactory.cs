using finances.api.Enums;
using finances2.api.Data.Models;

namespace finances.api.Factories {
    public class TransactionTotalTypeCalculatorFactory : ITransactionTotalTypeCalculatorFactory {
        public Delegates.TransactionTotalTypeCalculator Create(Enums.TransactionTotalCalculatorTypes type) {

            return type switch {
                TransactionTotalCalculatorTypes.YearAndPeriod => (Transaction t, YearAndPeriod yp) => (t.EffDate.Year == yp.Year) && (t.EffDate.Month == yp.Period),
                TransactionTotalCalculatorTypes.YTD => (Transaction t, YearAndPeriod yp) => (t.EffDate.Year < yp.Year) || ((t.EffDate.Year == yp.Year) && (t.EffDate.Month <= yp.Period)),
                _ => (Transaction t, YearAndPeriod yp) => false
            };
        }
    }
}
