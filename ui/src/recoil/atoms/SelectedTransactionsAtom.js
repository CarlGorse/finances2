import { atom } from "recoil";

export const selectedTransactionsAtom = atom({
    key: "selectedTransactionsState",
    default: []
});