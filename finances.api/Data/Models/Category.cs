using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace finances.api.Data.Models {

    public class Category : IEditableItem<Category> {

        [Key]
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public int GroupId { get; set; }
        public int GroupDisplayOrder { get; set; }

        public CategoryGroup Group { get; set; }
        public bool? DoNotDisplay { get; set; }

        [NotMapped]
        public int Id {
            get => CategoryId;
            set => CategoryId = value;
        }

        [NotMapped]
        public string NameWithGroup => true ? $"({Group.Name}) {Name}" : Name;

        public static string TypeDescriptions => "categories";

        public static string TypeDescription => "category";

        public static string TypeName => "Category";
    }
}
