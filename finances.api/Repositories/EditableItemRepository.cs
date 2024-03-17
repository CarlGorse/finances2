using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Dtos;
using finances.api.Logic;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace finances.api.Repositories {

    public abstract class EditableItemRepository<T> : GettableItemRepository<T>, IEditableItemRepository<T> where T : class, IEditableItem<T> {

        protected readonly IFinancesDbContext _DbContext;
        private readonly DbSet<T> _DbSet;
        private readonly IItemProperties<T> _ItemProperties;

        public EditableItemRepository(
            DbSet<T> dbSet,
            IFinancesDbContext dbContext,
            IItemProperties<T> itemProperties) : base(itemProperties) {

            _DbSet = dbSet;
            _DbContext = dbContext;
            _ItemProperties = itemProperties;
        }

        public bool Add(T item, out ICollection<string> validationErrors, bool saveChanges = true) {

            validationErrors = new List<string>();

            var isValidResult = IsValid(item);

            if (!isValidResult.IsValid) {
                _DbContext.CancelChanges();
                validationErrors.Add(isValidResult.ValidationMessage);
                return false;
            }

            try {
                _DbSet.Add(item);

                if (saveChanges) {
                    _DbContext.SaveChanges();
                }
            }
            catch {
                _DbContext.CancelChanges();
                validationErrors.Add($"Unable to add {_ItemProperties.DescriptionSingle}");
                return false;
            }

            return true;
        }

        public T Edit(T newValues, out ICollection<string> validationErrors) {

            validationErrors = new List<string>();

            var isValidId = Any(newValues.Id);
            if (!isValidId) {
                validationErrors.Add($"Id {newValues.Id} does not exist");
                return null;
            }

            var item = Get(newValues.Id);

            CopyValues(item, newValues);

            var isValidResult = IsValid(item);

            if (!isValidResult.IsValid) {
                validationErrors.Add(isValidResult.ValidationMessage);
                return null;
            }

            try {
                _DbContext.SaveChanges();
            }
            catch {
                _DbContext.CancelChanges();
                validationErrors.Add($"Unable to edit {_ItemProperties.DescriptionSingle}");
                return null;
            }

            return item;
        }

        public bool Delete(IEnumerable<int> ids, out ICollection<string> validationErrors) {

            validationErrors = new List<string>();

            var invalidIds = GetInvalidIds(ids);

            if (invalidIds.Any()) {
                validationErrors.Add($"The following {nameof(ids)} are invalid: {string.Join(", ", ids)}");
                return false;
            }

            try {
                var items = Get(ids);
                _DbSet.RemoveRange(items);
                _DbContext.SaveChanges();
            }
            catch {
                _DbContext.CancelChanges();
                validationErrors.Add($"Unable to delete {(ids.Count() == 1 ? _ItemProperties.DescriptionSingle : _ItemProperties.DescriptionPlural)}");
                return false;
            }

            return true;
        }

        public abstract IValidationResult IsValid(T item);

        public abstract void CopyValues(T existingItem, T newValues);

    }
}
