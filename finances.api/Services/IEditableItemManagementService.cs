using finances2.api.Enums;
using finanes.api.data.Models;
using System.Collections.Generic;

namespace finances2.api.Services {
    public interface IEditableItemManagementService<T> where T : class, IEditableItem<T> {
        ServiceResult Add(T item, out ICollection<string> validationErrors);
        ServiceResult Delete(IEnumerable<int> ids, out ICollection<string> validationErrors);
        ServiceResult Edit(T item, out ICollection<string> validationErrors);
    }
}