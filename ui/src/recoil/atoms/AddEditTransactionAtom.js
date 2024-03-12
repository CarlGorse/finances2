import { atom } from "recoil";

export const addEditTransactionAtom = atom({
    key: "addEditTransactionState",
    default: {
        TransactionId: null,
        EffDate: null,
        AccountId: null,
        CategoryId: null,
        Credit: null,
        Debit: null,
        IsWage: null,
        Exclude: null,
        Item: null,
        Description: null
    }
});