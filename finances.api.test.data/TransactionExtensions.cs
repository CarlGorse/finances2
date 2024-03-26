using finances.api.Data.Models;

namespace finances.api.test.data {
    public static class TransactionExtensions {

        public static void AddTransactions(this TestDataFactory dataFactory, ICollection<Transaction> transactions) {

            dataFactory.DbContext.AddRange(transactions);

            dataFactory.DbContext.SaveChanges();
        }

        public static void AddTransactions(this TestDataFactory dataFactory) {

            var transactionsToAdd = new List<Transaction> {
                new() {
                    CategoryId=1, AccountId=1, EffDate=DateOnly.FromDateTime(new DateTime(2024, 3, 3)), Credit = 100
                },
                new() {
                    CategoryId=1, AccountId=1, EffDate=DateOnly.FromDateTime(new DateTime(2024, 4, 4)), Debit = 220
                },
                                new() {
                    CategoryId=1, AccountId=1, EffDate=DateOnly.FromDateTime(new DateTime(2024, 5, 4)), Debit = 330
                },
                                                new() {
                    CategoryId=2, AccountId=1, EffDate=DateOnly.FromDateTime(new DateTime(2024, 6, 4)), Debit = 440
                }
            };

            transactionsToAdd = transactionsToAdd
                                .Where(x => !dataFactory.DbContext.Transactions.Any(y => y.TransactionId == x.TransactionId)).ToList();

            dataFactory.AddTransactions(transactionsToAdd);

            dataFactory.DbContext.SaveChanges();
        }
    }
}
