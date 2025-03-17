using finances2.api.Data.Models;

namespace finances.api.Delegates {
    public delegate bool TransactionTotalTypeCalculator(Transaction transaction, YearAndPeriod yearAndPeriod);
}
