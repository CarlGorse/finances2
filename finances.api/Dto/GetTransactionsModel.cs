namespace finances.api.Dto {
    public class GetTransactionsModel {
        public int AccountId { get; set; }
        public YearAndPeriodSearch YearAndPeriodSearch { get; set; }
        public int PageNo { get; set; }
        public bool IncludeRunningTotals { get; set; }
        public bool IncludeWageTotals { get; set; }
    }
}
