import { atom } from 'recoil';

export const transactionBadgeToShowState = atom({
    key: "TransactionBadgeToShowAtom",
    default: {
        Type: null,
        TransactionId: null
    }
});