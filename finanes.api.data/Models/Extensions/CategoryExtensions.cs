using finanes.api.data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace finances.api.Data.Models {

    public partial class Category : IEditableItem<Category> {

        [NotMapped]
        public int Id => CategoryId;

        [NotMapped]
        public string NameWithGroup => true ? $"({Group.Name}) {Name}" : Name;

        [NotMapped]
        public static string TypeDescriptions => "categories";

        [NotMapped]
        public static string TypeDescription => "category";

        [NotMapped]
        public static string TypeName => "Category";

        public override bool Equals(object obj) {
            return (obj is Category category)
                && Id.Equals(category.Id);
        }

        public override int GetHashCode() {
            return CategoryId.GetHashCode();
        }
    }
}
