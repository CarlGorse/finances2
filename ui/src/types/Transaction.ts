export default interface Transaction {
    TransactionId: number,
    AccountId: number,
    CategoryId: number,
    Credit: number,
    Debit: number,
    Description: String,
    EffDate: Date,
    IsWage: Boolean,
    Item: String
}