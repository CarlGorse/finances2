namespace finances.api.Dto {
    public class GetTransactionsModel {
        public SearchCriteria SearchCriteria { get; set; }
        public int PageNo { get; set; }
        public bool IncludeRunningTotals { get; set; }
        public bool IncludeWageTotals { get; set; }
    }
}
