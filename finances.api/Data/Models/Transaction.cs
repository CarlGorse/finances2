using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace finances.api.Data.Models {

    public class Transaction : IEditableItem<Transaction>, IHasTransactionProperties {

        [Key]
        public int TransactionId { get; set; }
        public DateTime EffDate { get; set; }

        [ForeignKey("AccountId")]
        public int AccountId { get; set; }

        [ForeignKey("CategoryId")]
        public int CategoryId { get; set; }
        public decimal Credit { get; set; }
        public decimal Debit { get; set; }
        public bool IsWage { get; set; }
        public bool Exclude { get; set; }
        public string Item { get; set; }
        public DateTime? DateModified { get; set; }

        public string Description { get; set; }

        [NotMapped]
        public decimal WageTotalForEffDate { get; set; }

        public Account Account { get; set; }

        public Category Category { get; set; }

        [NotMapped]
        public int Id {
            get => TransactionId;
            set => TransactionId = value;
        }

        [NotMapped]
        public int Period => EffDate.Month;

        [NotMapped]
        public int Year => EffDate.Year;

        public static string TypeDescriptions => "transactions";

        public static string TypeDescription => "transaction";

        public static string TypeName => "Transaction";
    }
}
