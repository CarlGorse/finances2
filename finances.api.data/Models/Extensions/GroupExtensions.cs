using finanes.api.data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace finances2.api.Data.Models {

    public partial class Group : IEditableItem<Group> {

        [NotMapped]
        public int Id => GroupId;

        [NotMapped]
        public static string TypeDescriptions => "category groups";

        [NotMapped]
        public static string TypeDescription => "category group";

        [NotMapped]
        public static string TypeName => "CategoryGroup";

        public override bool Equals(object obj) {
            return (obj is Group group) && Id.Equals(group.Id);
        }

        public override int GetHashCode() {
            return GroupId.GetHashCode();
        }
    }
}
