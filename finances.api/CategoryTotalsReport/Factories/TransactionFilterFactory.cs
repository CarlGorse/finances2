using finances.api.CategoryTotalsReport.Delegates;
using finances.api.CategoryTotalsReport.Enums;

namespace finances.api.CategoryTotalsReport.Factories {
    public class TransactionFilterFactory : ITransactionFilterFactory {
        public TransactionFilter Create(TransactionFilterTypes filterType) {

            return filterType switch {
                TransactionFilterTypes.YearAndPeriod => (t, yp) => t.EffDate.Year == yp.Year && t.EffDate.Month == yp.Period,
                TransactionFilterTypes.YTD => (t, yp) => t.EffDate.Year < yp.Year || (t.EffDate.Year == yp.Year && t.EffDate.Month <= yp.Period),
                _ => (t, yp) => false
            };
        }
    }
}
