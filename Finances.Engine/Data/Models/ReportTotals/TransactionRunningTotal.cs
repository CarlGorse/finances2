using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Finances.Engine.Data.Models.ReportTotals {

    public class TransactionRunningTotal {

        [Key]
        public int TransactionId { get; set; }

        public decimal RunningTotal { get; set; }

        public decimal RunningCredit { get; set; }

        public decimal RunningDebit { get; set; }

        [ForeignKey("TransactionId")]
        public Transaction Transaction { get; set; }
    }
}
