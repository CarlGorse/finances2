namespace finances2.api.Dto {
    public class MoveWagesModel {
        public int TransactionIdFrom { get; set; }
        public int TransactionIdTo { get; set; }
        public decimal CreditToMove { get; set; }
    }
}
