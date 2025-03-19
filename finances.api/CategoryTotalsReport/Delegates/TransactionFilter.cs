using finances2.api.Data.Models;

namespace finances.api.CategoryTotalsReport.Delegates {
    public delegate bool TransactionTotalTypeCalculator(Transaction transaction, YearAndPeriod yearAndPeriod);
}
