using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace finances2.api.Data.Models {

    [Table("CategoryGroups", Schema = "finances2")]
    public partial class Group {

        [Key]
        [Column("CategoryGroupId")]
        public int GroupId { get; set; }
        public string Name { get; set; }
        public int DisplayOrder { get; set; }

        [JsonIgnore]
        public ICollection<Category> Categories { get; set; }
    }
}
