using finances.api.Data.Models;

namespace finances.api.test.data {
    public static class GenericExtensions {

        public static void AddBaseData(this TestDataFactory dataFactory) {

            dataFactory.AddAccounts();
            dataFactory.AddGroups();
            dataFactory.AddCategories();

            dataFactory.DbContext.SaveChanges();
        }

        private static void AddAccounts(this TestDataFactory dataFactory) {

            var accountsToAdd = new List<Account> { new() { AccountId = 1, Name = "Natwest" } };

            accountsToAdd = accountsToAdd.Where(x =>
                    !dataFactory.DbContext.Accounts.Any(y => x.AccountId == y.AccountId)).ToList();

            if (accountsToAdd.Count == 0) {
                return;
            }

            dataFactory.DbContext.AddRange(accountsToAdd);
        }

        private static void AddGroups(this TestDataFactory dataFactory) {

            var groupsToAdd = new List<Group> { new() { GroupId = 1, Name = "Personal" } };

            groupsToAdd = groupsToAdd.Where(x =>
                    !dataFactory.DbContext.CategoryGroups.Any(y => x.GroupId == y.GroupId)).ToList();

            if (groupsToAdd.Count == 0) {
                return;
            }

            dataFactory.DbContext.AddRange(groupsToAdd);
        }

        private static void AddCategories(this TestDataFactory dataFactory) {

            var categoriesToAdd = new List<Category> {
                new() { CategoryId = 1, Name = "Carl", GroupId = 1 },
                new() { CategoryId = 2, Name = "Sam", GroupId = 1 } };

            categoriesToAdd = categoriesToAdd.Where(x =>
                    !dataFactory.DbContext.Categories.Any(y => x.CategoryId == y.CategoryId))
                .ToList();

            if (categoriesToAdd.Count == 0) {
                return;
            }

            dataFactory.DbContext.AddRange(categoriesToAdd);
        }
    }
}
