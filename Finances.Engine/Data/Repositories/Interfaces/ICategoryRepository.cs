using Finances.Engine.Data.Models;
using System.Collections.Generic;

namespace Finances.Engine.Data.Repositories.Interfaces {

    public interface ICategoryRepository : IEditableItemRepository<Category> {

        IEnumerable<Category> Categories { get; }
    }
}