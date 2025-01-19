import { atom } from 'recoil';

export const reloadTransactionsAtom = atom({
    key: "reloadTranmsactionsState",
    default: new Date()
});