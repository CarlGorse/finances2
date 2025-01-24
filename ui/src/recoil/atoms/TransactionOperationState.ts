import { atom } from 'recoil';

export const transactionOperationState = atom<string>({
    key: "transactionOperationState",
    default: ""
});