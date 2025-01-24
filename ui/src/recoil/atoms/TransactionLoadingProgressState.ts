import { atom } from 'recoil';

export const transactionLoadingProgressState = atom<string>({
    key: "transactionLoadingProgressState",
    default: ""
});