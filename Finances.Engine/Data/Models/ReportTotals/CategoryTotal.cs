using Finances.Engine.Data.Models.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Finances.Engine.Data.Models.ReportTotals {

    public class CategoryTotal : IIteamYearAndPeriodTotal {

        public int CategoryId { get; set; }

        [NotMapped]
        public int ItemId => CategoryId;
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

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
    }
}