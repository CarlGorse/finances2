export default interface Transaction {
    TransactionId: number,
    AccountId: number,
    CategoryId,
    Credit: number,
    Debit: number,
    Description: string,
    EffDate: Date,
    IsWage: Boolean,
    Item: string
}