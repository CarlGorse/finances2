using finances2.api.Enums;
using finanes.api.data.Models;
using System.Collections.Generic;

namespace finances2.api.Repositories {

    public interface IEditableItemRepository<T> : IGettableItemRepository<T> where T : class, IEditableItem<T>, IGettableItem<T> {

        ServiceResult Add(T item, out ICollection<string> validationErrors);
        ServiceResult Edit(T newItemValues, out ICollection<string> validationErrors);
        ServiceResult Delete(IEnumerable<int> ids, out ICollection<string> validationErrors);
    }
}