namespace finances.api.CategoryTotalsReport.Dto {
    public class MoveWagesDTO {
        public int TransactionIdFrom { get; set; }
        public int TransactionIdTo { get; set; }
        public decimal CreditToMove { get; set; }
    }
}
