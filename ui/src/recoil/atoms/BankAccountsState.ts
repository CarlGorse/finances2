import { atom } from 'recoil';
import BankAccount from 'types/BankAccount'

export const bankAccountsState = atom<BankAccount[]>({
    key: "banKAccountsState",
    default: []
});