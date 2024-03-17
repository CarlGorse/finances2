using finances.api.Data.Models;
using System.Collections.Generic;

namespace finances.api.Repositories {

    public interface ICategoryGroupRepository : IEditableItemRepository<CategoryGroup> {

        IEnumerable<CategoryGroup> CategoryGroups { get; }
    }
}