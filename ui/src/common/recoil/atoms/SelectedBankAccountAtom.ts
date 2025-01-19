import { atom } from 'recoil';
import BankAccount from 'types/BankAccount'

export const selectedBankAccountAtom = atom<BankAccount>({
    key: "selectedBankAccountState",
    default: {
        AccountId: null,
        Name: null
    }
});