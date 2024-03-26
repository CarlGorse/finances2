using System.ComponentModel.DataAnnotations;

namespace finances.api.Data.Models {

    public partial class Account() {

        [Key]
        public int AccountId { get; set; }

        public string Name { get; set; }

        public int DisplayOrder { get; set; }
    }
}
