import { atom } from 'recoil';

export const addEditTransactionAtom = atom({
    key: "addEditTransactionState",
    default: {
        AccountId: null,
        CategoryId: null,
        Credit: null,
        Debit: null,
        Description: 'hi',
        EffDate: (new Date()).toISOString().split('T')[0],
        IsWage: null,
        Item: null,
        TransactionId: null
    }
});