using finances.api.Data.Models;
using finances.api.Enums;
using finances.api.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Services {

    public class EditableItemControllerService<T>(
        IEditableItemRepository<T> editableItemRepository
        ) : IEditableItemControllerService<T> where T : class, IEditableItem<T> {

        private readonly IEditableItemRepository<T> _editableItemRepository = editableItemRepository;

        public ServiceResult Get(IEnumerable<int> ids, out ICollection<string> validationErrors) {

            validationErrors = [];

            var items = _editableItemRepository.Get(ids);

            if (!items.Any()) {
                validationErrors.Add($"Unknown {T.TypeDescription}");

                return ServiceResult.Invalid;
            }

            return ServiceResult.Ok;
        }

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
