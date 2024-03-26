using System.ComponentModel.DataAnnotations;

namespace finances.api.Data.Models {

    public partial class Category {

        [Key]
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public int GroupId { get; set; }
        public int GroupDisplayOrder { get; set; }

        public Group Group { get; set; }
        public bool? DoNotDisplay { get; set; }
    }
}
