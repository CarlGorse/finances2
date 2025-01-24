import { atom } from 'recoil';

export const validTransactionOperationsState = atom<string[]>({
    key: "validTransactionOperationsState",
    default: []
});