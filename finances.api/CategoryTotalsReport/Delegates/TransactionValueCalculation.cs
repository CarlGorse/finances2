using finances2.api.Data.Models;

namespace finances.api.CategoryTotalsReport.Delegates {
    public delegate decimal TransactionValueCalculator(Transaction transaction);
}
