namespace finances2.api.Dto {
    public class GetTransactionsParams {
        public int AccountId { get; set; }
        public YearAndPeriodSearch YearAndPeriodSearch { get; set; }
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public bool IncludeRunningTotals { get; set; }
        public bool IncludeWageTotals { get; set; }
    }
}
