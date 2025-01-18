using finances.api.Data;
using finances.api.Enums;
using finances.api.Logic;
using finanes.api.data.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Repositories {

    public abstract class EditableItemRepository<T>(
        DbSet<T> dbSet,
        IFinancesDbContext dbContext) : GettableItemRepository<T>(), IEditableItemRepository<T> where T : class, IEditableItem<T> {

        protected readonly IFinancesDbContext _dbContext = dbContext;
        private readonly DbSet<T> _dbSet = dbSet;

        public ServiceResult Add(T item, out ICollection<string> validationErrors) {

            validationErrors = [];

            var isValidResult = IsValid(item);

            if (!isValidResult.IsValid) {
                _dbContext.CancelChanges();
                validationErrors.Add(isValidResult.ValidationMessage);
                return ServiceResult.Error;
            }

            try {
                _dbSet.Add(item);
                _dbContext.SaveChanges();
            }
            catch {
                _dbContext.CancelChanges();
                validationErrors.Add($"Unable to add {T.TypeDescription}");
                return ServiceResult.Error;
            }

            return ServiceResult.Ok;
        }

        public ServiceResult Edit(T newValues, out ICollection<string> validationErrors) {

            validationErrors = [];

            var isValidId = Any(newValues.Id);
            if (!isValidId) {
                validationErrors.Add($"Id {newValues.Id} does not exist");
                return ServiceResult.Invalid;
            }

            var updatedItem = Get(newValues.Id);

            CopyValues(updatedItem, newValues);

            var isValidResult = IsValid(updatedItem);

            if (!isValidResult.IsValid) {
                validationErrors.Add(isValidResult.ValidationMessage);
                return ServiceResult.Invalid;
            }

            try {
                _dbContext.SaveChanges();
            }
            catch {
                _dbContext.CancelChanges();
                validationErrors.Add($"Unable to edit {T.TypeDescription}");
                return ServiceResult.Error;
            }

            return ServiceResult.Ok;
        }

        public ServiceResult Delete(IEnumerable<int> ids, out ICollection<string> validationErrors) {

            validationErrors = [];

            if (ids == null || !ids.Any()) {
                validationErrors.Add($"No {nameof(ids)} provided");
                return ServiceResult.Invalid;
            }

            var invalidIds = GetInvalidIds(ids);

            if (invalidIds.Any()) {
                validationErrors.Add($"Invalid {nameof(ids)}: {string.Join(", ", ids)}");
                return ServiceResult.Invalid;
            }

            try {
                var items = Get(ids);
                _dbSet.RemoveRange(items);
                _dbContext.SaveChanges();
            }
            catch {
                _dbContext.CancelChanges();
                validationErrors.Add($"Unable to delete {(ids.Count() == 1 ? T.TypeDescription : T.TypeDescriptions)}");
                return ServiceResult.Error;
            }

            return ServiceResult.Ok;
        }

        public abstract IValidationResult IsValid(T item);

        public abstract void CopyValues(T existingItem, T newValues);

        protected IEnumerable<int> ValidIds(IEnumerable<int> ids) {
            return Get(ids).Select(x => x.Id);
        }

        protected IEnumerable<int> GetInvalidIds(IEnumerable<int> ids) {
            var validIds = ValidIds(ids);
            if (!validIds.Any()) {
                return Enumerable.Empty<int>();
            }
            return ValidIds(ids).Except(ids);
        }
    }
}
