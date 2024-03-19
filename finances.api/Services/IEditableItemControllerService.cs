using finances.api.Data.Models;
using finances.api.Enums;
using System.Collections.Generic;

namespace finances.api.Services {
    public interface IEditableItemControllerService<T> where T : class, IEditableItem<T> {
        ServiceResult Get(IEnumerable<int> ids, out ICollection<string> validationErrors);
        ServiceResult Add(T item, out ICollection<string> validationErrors);
        ServiceResult Delete(IEnumerable<int> ids, out ICollection<string> validationErrors);
        ServiceResult Edit(T item, out ICollection<string> validationErrors);
    }
}