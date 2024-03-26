using finances.api.Data;

namespace finances.api.test.data {
    public class TestDataFactory(IFinancesDbContext dbContext) {

        public AppDbContext DbContext { get; set; } = (AppDbContext)dbContext;
    }
}
