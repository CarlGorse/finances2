import Transaction from "types/Transaction";

export default interface LoadedTransactions {
  PageCount: number;
  PageSize: number;
  Transactions: Transaction[];
  TotalTransactions: number;
}
