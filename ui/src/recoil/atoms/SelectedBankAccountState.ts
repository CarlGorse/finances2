import { atom } from "recoil";
import BankAccount from "types/BankAccount";

export const selectedBankAccountState = atom<BankAccount>({
  key: "selectedBankAccountState",
  default: {
    AccountId: null,
    Name: null,
  },
});
