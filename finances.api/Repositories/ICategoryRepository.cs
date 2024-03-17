using finances.api.Data.Models;
using System.Collections.Generic;

namespace finances.api.Repositories {

    public interface ICategoryRepository : IEditableItemRepository<Category> {

        IEnumerable<Category> Categories { get; }
    }
}