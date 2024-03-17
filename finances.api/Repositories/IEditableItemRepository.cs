using finances.api.Data.Models;
using System.Collections.Generic;

namespace finances.api.Repositories {

    public interface IEditableItemRepository<T> : IGettableItemRepository<T> where T : class, IEditableItem<T>, IGettableItem<T> {

        EditResult Add(T item, out ICollection<string> validationErrors, bool saveChanges = true);
        EditResult Delete(IEnumerable<int> ids, out ICollection<string> validationErrors);
        EditResult Edit(T newItemValues, out ICollection<string> validationErrors, out T item);

        void CopyValues(T existingItem, T newValues);
    }
}