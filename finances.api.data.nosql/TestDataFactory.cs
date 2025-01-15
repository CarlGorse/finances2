using finances.api.Data;

namespace finances.api.data.nosql {
    public class TestDataFactory(IFinancesDbContext dbContext) {

        public AppDbContext DbContext { get; set; } = (AppDbContext)dbContext;
    }
}
