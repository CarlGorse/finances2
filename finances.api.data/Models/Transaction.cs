using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace finances2.api.Data.Models {

    [Table("Transactions", Schema = "finances2")]
    public partial class Transaction {

        [Key]
        public int TransactionId { get; set; }

        [ForeignKey("AccountId")]
        public int AccountId { get; set; }

        [ForeignKey("CategoryId")]
        public int CategoryId { get; set; }

        public decimal Credit { get; set; }
        public decimal Debit { get; set; }
        public bool IsWage { get; set; }
        public string Item { get; set; }

        public string Description { get; set; }

        public Account Account { get; set; }

        public Category Category { get; set; }

        public DateOnly EffDate { get; set; }

        public bool Exclude { get; set; }
    }
}
