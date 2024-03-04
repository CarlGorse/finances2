using Finances.Engine.Data.Models;
using Finances.Engine.Data.Models.Interfaces;
using Finances.Engine.Dtos;
using Finances.Engine.Interfaces.Dtos;
using Finances.Engine.Interfaces.Factories;
using System;

namespace Finances.Engine.Factories {
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
