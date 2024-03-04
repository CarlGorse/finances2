
using Finances.Engine.Data.Models.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Finances.Engine.Data.Models {

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
    }
}
