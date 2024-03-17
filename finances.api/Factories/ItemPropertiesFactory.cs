using finances.api.Data.Models;
using finances.api.Dtos;

namespace finances.api.Factories {
    public class ItemPropertiesFactory : IItemPropertiesFactory {

        public IItemProperties<T> Get<T>() {
            return typeof(T).Name switch {
                nameof(Account) => (IItemProperties<T>)new ItemProperties<Account>("Account", "account", "accounts"),
                nameof(Category) => (IItemProperties<T>)new ItemProperties<Category>("Category", "category", "categories"),
                nameof(CategoryGroup) => (IItemProperties<T>)new ItemProperties<CategoryGroup>("CategoryGroup", "category group", "category groups"),
                nameof(Transaction) => (IItemProperties<T>)new ItemProperties<Transaction>("Transaction", "transaction", "transactions"),
                _ => (IItemProperties<T>)new ItemPropertiesNull(),
            };
        }
    }
}
