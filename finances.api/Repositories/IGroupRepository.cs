using finances.api.Data.Models;
using System.Collections.Generic;

namespace finances.api.Repositories {

    public interface IGroupRepository : IEditableItemRepository<Group> {

        IEnumerable<Group> Groups { get; }
    }
}