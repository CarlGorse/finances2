using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace finances.api.Data.Models {

    [Table("CategoryGroup")]
    public partial class Group {

        [Key]
        public int GroupId { get; set; }
        public string Name { get; set; }
        public int DisplayOrder { get; set; }

        [JsonIgnore]
        public ICollection<Category> Categories { get; set; }
    }
}
