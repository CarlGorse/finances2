import { atom } from 'recoil';

export const transactionsPageSizeAtom = atom({
    key: "transactionsPageSizeState",
    default: 50
});