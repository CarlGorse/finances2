import Transaction from 'types/Transaction'

export default interface LoadedTransactions {
    pageCount: number,
    transactions: Transaction[],
    totalTransactions: number
}