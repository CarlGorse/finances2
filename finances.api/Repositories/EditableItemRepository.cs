using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Logic;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Repositories {

    public enum EditResult {
        Ok,
        Invalid,
        Error
    }

    public abstract class EditableItemRepository<T>(
        DbSet<T> dbSet,
        IFinancesDbContext dbContext) : GettableItemRepository<T>(), IEditableItemRepository<T> where T : class, IEditableItem<T> {

        protected readonly IFinancesDbContext _DbContext = dbContext;
        private readonly DbSet<T> _DbSet = dbSet;

        public EditResult Add(T item, out ICollection<string> validationErrors, bool saveChanges = true) {

            validationErrors = [];

            var isValidResult = IsValid(item);

            if (!isValidResult.IsValid) {
                _DbContext.CancelChanges();
                validationErrors.Add(isValidResult.ValidationMessage);
                return EditResult.Ok;
            }

            try {
                _DbSet.Add(item);

                if (saveChanges) {
                    _DbContext.SaveChanges();
                }
            }
            catch {
                _DbContext.CancelChanges();
                validationErrors.Add($"Unable to add {T.TypeDescription}");
                return EditResult.Error;
            }

            return EditResult.Ok;
        }

        public EditResult Edit(T newValues, out ICollection<string> validationErrors, out T item) {

            validationErrors = [];

            item = null;

            var isValidId = Any(newValues.Id);
            if (!isValidId) {
                validationErrors.Add($"Id {newValues.Id} does not exist");
                return EditResult.Invalid;
            }

            item = Get(newValues.Id);

            CopyValues(item, newValues);

            var isValidResult = IsValid(item);

            if (!isValidResult.IsValid) {
                validationErrors.Add(isValidResult.ValidationMessage);
                return EditResult.Invalid;
            }

            try {
                _DbContext.SaveChanges();
            }
            catch {
                _DbContext.CancelChanges();
                validationErrors.Add($"Unable to edit {T.TypeDescription}");
                return EditResult.Error;
            }

            return EditResult.Ok;
        }

        public EditResult Delete(IEnumerable<int> ids, out ICollection<string> validationErrors) {

            validationErrors = [];

            var invalidIds = GetInvalidIds(ids);

            if (invalidIds.Any()) {
                validationErrors.Add($"Invalid {nameof(ids)}: {string.Join(", ", ids)}");
                return EditResult.Invalid;
            }

            try {
                var items = Get(ids);
                _DbSet.RemoveRange(items);
                _DbContext.SaveChanges();
            }
            catch {
                _DbContext.CancelChanges();
                validationErrors.Add($"Unable to delete {(ids.Count() == 1 ? T.TypeDescription : T.TypeDescriptions)}");
                return EditResult.Error;
            }

            return EditResult.Ok;
        }

        public abstract IValidationResult IsValid(T item);

        public abstract void CopyValues(T existingItem, T newValues);

    }
}
