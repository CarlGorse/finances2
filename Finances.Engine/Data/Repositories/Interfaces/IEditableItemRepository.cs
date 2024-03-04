using Finances.Engine.Data.Models.Interfaces;
using System.Collections.Generic;

namespace Finances.Engine.Data.Repositories.Interfaces {

    public interface IEditableItemRepository<T> : IGettableItemRepository<T> where T: class, IEditableItem<T>, IGettableItem<T> {

        bool Add(T item, out ICollection<string> validationErrors, bool saveChanges);
        bool Delete(IEnumerable<int> ids,  out ICollection<string> validationErrors);
        T Edit(T newItemValues, out ICollection<string> validationErrors);

        void CopyValues(T existingItem, T newValues);
    }
}