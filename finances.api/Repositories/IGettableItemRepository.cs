using finanes.api.data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace finances2.api.Repositories {

    public interface IGettableItemRepository<T> where T : class, IGettableItem<T> {
        ICollection<T> Get(Expression<Func<T, bool>> predicate);
        T Get(int id);
        bool Any(int id);
        IQueryable<T> All();
    }
}