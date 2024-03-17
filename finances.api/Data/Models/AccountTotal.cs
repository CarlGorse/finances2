using System.ComponentModel.DataAnnotations.Schema;

namespace finances.api.Data.Models {

    public class AccountTotal : IIteamYearAndPeriodTotal {

        public int AccountId { get; set; }

        [NotMapped]
        public int ItemId => AccountId;
        public int Year { get; set; }
        public int Period { get; set; }

        public decimal TotalByPeriod { get; set; }
        public decimal CreditByPeriod { get; set; }
        public decimal DebitByPeriod { get; set; }

        public decimal AccumulatedTotalByPeriod { get; set; }
        public decimal AccumulatedCreditByPeriod { get; set; }
        public decimal AccumulatedDebitByPeriod { get; set; }

        public decimal AverageTotalByPeriod { get; set; }
        public decimal AverageCreditByPeriod { get; set; }
        public decimal AverageDebitByPeriod { get; set; }

        [ForeignKey("AccountId")]
        public Account Account { get; set; }
    }
}
