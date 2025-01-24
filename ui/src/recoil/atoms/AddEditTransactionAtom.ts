import { atom } from 'recoil';
import Transaction from 'types/Transaction';

export const addEditTransactionState = atom<Transaction>({
    key: "addEditTransactionState",
    default: {
        AccountId: null,
        CategoryId: null,
        Credit: null,
        Debit: null,
        Description: 'hi',
        EffDate: new Date((new Date()).toISOString().split('T')[0]),
        IsWage: null,
        Item: null,
        TransactionId: null
    }
});