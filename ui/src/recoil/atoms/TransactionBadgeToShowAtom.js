import { atom } from "recoil";

export const transactionBadgeToShowAtom = atom({
    key: "TransactionBadgeToShowAtom",
    default: {
        Type: null,
        TransactionId: null
    }
});