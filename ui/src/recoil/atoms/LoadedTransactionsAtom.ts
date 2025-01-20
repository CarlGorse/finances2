import { atom } from 'recoil';

export const loadedTransactionsState = atom({
    key: "loadedTransactionsState",
    default: []
});