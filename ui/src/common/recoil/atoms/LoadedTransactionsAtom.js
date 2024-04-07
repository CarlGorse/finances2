import { atom } from 'recoil';

export const loadedTransactionsAtom = atom({
    key: "loadedTransactionsState",
    default: []
});