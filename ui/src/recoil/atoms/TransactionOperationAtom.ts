import { atom } from 'recoil';
import TransactionOperation from 'types/TransactionOperation';

export const transactionOperationState = atom<TransactionOperation>({
    key: "transactionOperationState",
    default: {
        Description: null
    }
});