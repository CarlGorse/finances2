using finances2.api.Data;

namespace finances2.api.data.nosql {
    public class TestDataFactory(IFinancesDbContext dbContext) {

        public AppDbContext DbContext { get; set; } = (AppDbContext)dbContext;
    }
}
