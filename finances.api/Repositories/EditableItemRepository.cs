using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Enums;
using finances.api.Logic;
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
                return ServiceResult.Ok;
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

        public ServiceResult Edit(T newValues, out ICollection<string> validationErrors, out T item) {

            validationErrors = [];

            item = null;

            var isValidId = Any(newValues.Id);
            if (!isValidId) {
                validationErrors.Add($"Id {newValues.Id} does not exist");
                return ServiceResult.Invalid;
            }

            item = Get(newValues.Id);

            CopyValues(item, newValues);

            var isValidResult = IsValid(item);

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

    }
}
