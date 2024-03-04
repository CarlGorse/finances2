using Finances.Engine.Data.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Finances.Engine.Data.Repositories.Interfaces {

    public interface IGettableItemRepository<T> where T: class, IGettableItem<T> {

        IEnumerable<T> Get(IEnumerable<int> itemIds);
        IEnumerable<T> Get(Expression<Func<T, bool>> predicate);
        T Get(int id);

        bool Any(IEnumerable<int> itemIds);
        bool Any(Expression<Func<T, bool>> predicate);
        bool Any(int id);

        IEnumerable<T> All();
    }
}