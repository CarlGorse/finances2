using Finances.Engine.Data.Models;
using System.Collections.Generic;

namespace Finances.Engine.Data.Repositories.Interfaces {

    public interface ICategoryGroupRepository : IEditableItemRepository<CategoryGroup> {

        IEnumerable<CategoryGroup> CategoryGroups { get; }
    }
}