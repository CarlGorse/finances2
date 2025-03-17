using finanes.api.data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;

namespace finances2.api.Repositories {

    public abstract class GettableItemRepository<T> : IGettableItemRepository<T> where T : class, IGettableItem<T> {

        public T Get(int id) {
            return Get($"x => x.{IdPropertyName} == {id}").SingleOrDefault();
        }

        public IEnumerable<T> Get(IEnumerable<int> itemIds) {
            return Get($"x => @0.Contains(x.{IdPropertyName})", itemIds);
        }

        public ICollection<T> Get(Expression<Func<T, bool>> predicate) {
            return ItemsQuery()
                    .Where(predicate)
                    .ToList();
        }

        public string IdPropertyName => $"{T.TypeName}Id";

        private IQueryable<T> Get(string selector, params object[] args) {
            return ItemsQuery()
                .Where(selector, args);
        }

        protected abstract IQueryable<T> ItemsQuery();

        public IEnumerable<T> Items => [.. ItemsQuery()];

        public bool Any(int id) {
            return Get(id) != null;
        }

        public IQueryable<T> All() {
            return ItemsQuery();
        }
    }
}
