using finances2.api.Data.Models;
using System.Collections.Generic;

namespace finances2.api.Repositories {

    public interface ICategoryRepository : IEditableItemRepository<Category> {

        IEnumerable<Category> Categories { get; }
    }
}