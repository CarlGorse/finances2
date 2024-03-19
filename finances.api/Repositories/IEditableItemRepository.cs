using finances.api.Data.Models;
using finances.api.Enums;
using System.Collections.Generic;

namespace finances.api.Repositories {

    public interface IEditableItemRepository<T> : IGettableItemRepository<T> where T : class, IEditableItem<T>, IGettableItem<T> {

        ServiceResult Add(T item, out ICollection<string> validationErrors);
        ServiceResult Edit(T newItemValues, out ICollection<string> validationErrors, out T item);
        ServiceResult Delete(IEnumerable<int> ids, out ICollection<string> validationErrors);
    }
}