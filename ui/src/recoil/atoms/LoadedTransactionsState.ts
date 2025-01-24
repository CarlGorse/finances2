import { atom } from 'recoil';
import LoadedTransactions from 'types/LoadedTransactions';

export const loadedTransactionsState = atom<LoadedTransactions>({
    key: "loadedTransactionsState",
    default: {
        pageCount: 0,
        totalTransactions: 0,
        transactions: []
    }
});