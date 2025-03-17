namespace finances.api.Factories {
    public interface ITransactionValueCalculatorFactory {
        Delegates.TransactionValueCalculator Create(Enums.TeasactionValueCalculatorTypes type);
    }
}