using finances2.api.Enums;
using finances2.api.Repositories;
using finanes.api.data.Models;
using System.Collections.Generic;

namespace finances2.api.Services {

    public class EditableItemManagementService<T>(
        IEditableItemRepository<T> editableItemRepository
        ) : IEditableItemManagementService<T> where T : class, IEditableItem<T> {

        private readonly IEditableItemRepository<T> _editableItemRepository = editableItemRepository;

        public ServiceResult Add(T item, out ICollection<string> validationErrors) {
            return _editableItemRepository.Add(item, out validationErrors);
        }

        public ServiceResult Edit(T item, out ICollection<string> validationErrors) {
            return _editableItemRepository.Edit(item, out validationErrors);
        }

        public ServiceResult Delete(IEnumerable<int> ids, out ICollection<string> validationErrors) {
            return _editableItemRepository.Delete(ids, out validationErrors);
        }
    }
}
