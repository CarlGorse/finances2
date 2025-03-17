using finances2.api.Data.Models;
using System.Collections.Generic;

namespace finances2.api.Repositories {

    public interface IGroupRepository : IEditableItemRepository<Group> {

        IEnumerable<Group> Groups { get; }
    }
}