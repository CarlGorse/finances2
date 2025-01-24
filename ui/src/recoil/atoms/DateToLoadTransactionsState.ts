import { atom } from 'recoil';

export const dateToLoadTransactionsState = atom({
    key: "dateToLoadTransactionsState",
    default: new Date()
});