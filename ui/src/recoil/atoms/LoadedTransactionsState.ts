import { atom } from "recoil";
import LoadedTransactions from "types/LoadedTransactions";

export const loadedTransactionsState = atom<LoadedTransactions>({
  key: "loadedTransactionsState",
  default: {
    PageCount: 0,
    PageSize: 0,
    TotalTransactions: 0,
    Transactions: [],
  },
});
