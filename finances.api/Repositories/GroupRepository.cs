using finances2.api.Data;
using finances2.api.Data.Models;
using finances2.api.Logic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Collections.Generic;

namespace finances2.api.Repositories {

    public class GroupRepository(IFinancesDbContext dbContext) : EditableItemRepository<Group>(
            dbContext.CategoryGroups,
            dbContext), IGroupRepository {

        public IEnumerable<Group> Groups => Items;

        protected override IIncludableQueryable<Group, IEnumerable<Category>> ItemsQuery() {
            return _dbContext.CategoryGroups
                .Include(x => x.Categories);
        }

        public override IValidationResult IsValid(Group categoryGroup) {

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

        public override void CopyValues(Group existingItem, Group newValues) {

            if (existingItem == null || newValues == null) {
                return;
            }

            if (newValues.Id > 0 && newValues.Id != existingItem.Id) {
                existingItem.GroupId = newValues.Id;
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
