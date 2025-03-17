using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace finances2.api.Data.Models {

    [Table("Accounts", Schema = "finances2")]
    public partial class Account() {

        [Key]
        public int AccountId { get; set; }

        public string Name { get; set; }

        public int DisplayOrder { get; set; }
    }
}
