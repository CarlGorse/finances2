import { atom } from 'recoil';

export const reloadTransactionsState = atom({
    key: "reloadTranmsactionsState",
    default: new Date()
});