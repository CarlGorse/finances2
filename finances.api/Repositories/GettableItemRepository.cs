using finances.api.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;

namespace finances.api.Repositories {

    public abstract class GettableItemRepository<T> : IGettableItemRepository<T> where T : class, IGettableItem<T> {

        public T Get(int id) {
            return Get($"x => x.{IdPropertyName} == {id}").SingleOrDefault();
        }

        public IEnumerable<T> Get(IEnumerable<int> itemIds) {
            return Get($"x => @0.Contains(x.{IdPropertyName})", itemIds);
        }

        public IEnumerable<T> Get(Expression<Func<T, bool>> predicate) {
            return ItemsQuery()
                .Where(predicate);
        }

        public string IdPropertyName => $"{T.TypeName}Id";

        private IEnumerable<T> Get(string selector, params object[] args) {
            return ItemsQuery()
                .Where(selector, args);
        }

        protected abstract IQueryable<T> ItemsQuery();

        public IEnumerable<T> Items => [.. ItemsQuery()];

        public bool Any(int id) {
            return Get(id) != null;
        }

        public bool Any(IEnumerable<int> ids) {
            var items = Get(ids);
            return items != null && items.Any();
        }

        public bool Any(Expression<Func<T, bool>> predicate) {
            var items = Get(predicate);
            return items != null && items.Any();
        }

        public IEnumerable<T> All() {
            return Get(x => true);
        }

        #region private

        protected IEnumerable<int> ValidIds(IEnumerable<int> ids) {
            return Get(ids).Select(x => x.Id);
        }

        protected IEnumerable<int> GetInvalidIds(IEnumerable<int> ids) {
            return ValidIds(ids).Except(ids);
        }

        #endregion private
    }
}
