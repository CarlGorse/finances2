using System.ComponentModel.DataAnnotations;

namespace finances.api.Data.Models {

    public class TransactionRunningTotal {

        [Key]
        public int TransactionId { get; set; }

        public decimal RunningTotal { get; set; }

        public decimal RunningCredit { get; set; }

        public decimal RunningDebit { get; set; }
    }
}
