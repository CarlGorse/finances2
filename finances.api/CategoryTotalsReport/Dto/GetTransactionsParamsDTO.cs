namespace finances.api.CategoryTotalsReport.Dto {
    public class GetTransactionsParamsDTO {
        public int AccountId { get; set; }
        public YearAndPeriodSearchDTO YearAndPeriodSearch { get; set; }
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public bool IncludeRunningTotals { get; set; }
        public bool IncludeWageTotals { get; set; }
    }
}
