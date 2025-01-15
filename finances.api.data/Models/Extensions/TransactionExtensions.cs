using finanes.api.data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace finances.api.Data.Models {

    public partial class Transaction : IEditableItem<Transaction> {

        [NotMapped]
        public int Id => TransactionId;

        //public int Year { get; private set; }

        //public int Period { get; private set; }

        [NotMapped]
        public decimal AccountRunningTotal { get; set; }

        [NotMapped]
        public decimal WageTotal { get; set; }

        [NotMapped]
        public static string TypeDescriptions => "transactions";

        [NotMapped]
        public static string TypeDescription => "transaction";

        [NotMapped]
        public static string TypeName => "Transaction";
    }
}
