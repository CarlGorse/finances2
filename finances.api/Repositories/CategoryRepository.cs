using finances2.api.Data;
using finances2.api.Data.Models;
using finances2.api.Logic;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace finances2.api.Repositories {

    public class CategoryRepository(
        IFinancesDbContext dbContext,
        IGroupRepository categoryGroupRepository) : EditableItemRepository<Category>(
            dbContext.Categories,
            dbContext), ICategoryRepository {

        private readonly IGroupRepository _CategoryGroupRepository = categoryGroupRepository;

        public IEnumerable<Category> Categories => Items;

        protected override IQueryable<Category> ItemsQuery() {
            return _dbContext.Categories
                .Include(x => x.Group);
        }

        public override IValidationResult IsValid(Category category) {

            var context = "Invalid category";

            if (category == null) {
                return new ValidationResultFalse(context, "Not initialised");
            }

            if (category.Name == null || category.Name.Length == 0) {
                return new ValidationResultFalse(context, "Name cannot be empty");
            }

            if (category.GroupDisplayOrder == 0) {
                return new ValidationResultFalse(context, "Display order must be greater than zero");
            }

            var isValidCategoryGroup = _CategoryGroupRepository.Any(category.GroupId);
            if (!isValidCategoryGroup) {
                return new ValidationResultFalse(context, "Unknown category group");
            }

            return new ValidationResultTrue();
        }

        public override void CopyValues(Category existingItem, Category newValues) {

            if (existingItem == null || newValues == null) {
                return;
            }

            if (newValues.GroupId > 0 && newValues.GroupId != existingItem.GroupId) {
                existingItem.GroupId = newValues.GroupId;
            }

            if (newValues.Name.Length > 0 && newValues.Name != existingItem.Name) {
                existingItem.Name = newValues.Name;
            }

            if (newValues.GroupId > 0 && newValues.GroupId != existingItem.GroupId) {
                existingItem.GroupId = newValues.GroupId;
            }

            if (newValues.GroupDisplayOrder > 0 && newValues.GroupDisplayOrder != existingItem.GroupDisplayOrder) {
                existingItem.GroupDisplayOrder = newValues.GroupDisplayOrder;
            }
        }
    }
}
