import { atom } from 'recoil';

export const transactionsPageSizeState = atom({
    key: "transactionsPageSizeState",
    default: 50
});