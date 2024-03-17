using finances.api.Data.Models;
using System.Collections.Generic;

namespace finances.api.Repositories {

    public interface IEditableItemRepository<T> : IGettableItemRepository<T> where T : class, IEditableItem<T>, IGettableItem<T> {

        bool Add(T item, out ICollection<string> validationErrors, bool saveChanges = true);
        bool Delete(IEnumerable<int> ids, out ICollection<string> validationErrors);
        T Edit(T newItemValues, out ICollection<string> validationErrors);

        void CopyValues(T existingItem, T newValues);
    }
}