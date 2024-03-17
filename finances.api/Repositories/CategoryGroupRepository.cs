using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Dtos;
using finances.api.Logic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Collections.Generic;

namespace finances.api.Repositories {

    public class CategoryGroupRepository : EditableItemRepository<CategoryGroup>, ICategoryGroupRepository {

        public CategoryGroupRepository(
            IFinancesDbContext dbContext,
            IItemProperties<CategoryGroup> itemProperties) : base(
                dbContext.CategoryGroups,
                dbContext,
                itemProperties) {
        }

        public IEnumerable<CategoryGroup> CategoryGroups => Items;

        protected override IIncludableQueryable<CategoryGroup, IEnumerable<Category>> ItemsQuery() {
            return _DbContext.CategoryGroups
                .Include(x => x.Categories);
        }

        public override IValidationResult IsValid(CategoryGroup categoryGroup) {

            var context = "Invalid category group";

            if (categoryGroup == null) {
                return new ValidationResultFalse(context, "Not initialised");
            }

            if (categoryGroup.Name == null || categoryGroup.Name.Length == 0) {
                return new ValidationResultFalse(context, "Name cannot be is empty");
            }

            if (categoryGroup.DisplayOrder == 0) {
                return new ValidationResultFalse(context, "Display order must be greater than zero");
            }

            return new ValidationResultTrue();
        }

        public override void CopyValues(CategoryGroup existingItem, CategoryGroup newValues) {

            if (existingItem == null || newValues == null) {
                return;
            }

            if (newValues.CategoryGroupId > 0 && newValues.CategoryGroupId != existingItem.CategoryGroupId) {
                existingItem.CategoryGroupId = newValues.CategoryGroupId;
            }

            if (newValues.Name.Length > 0 && newValues.Name != existingItem.Name) {
                existingItem.Name = newValues.Name;
            }

            if (newValues.DisplayOrder > 0 && newValues.DisplayOrder != existingItem.DisplayOrder) {
                existingItem.DisplayOrder = newValues.DisplayOrder;
            }
        }
    }
}
