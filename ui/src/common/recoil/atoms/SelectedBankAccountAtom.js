import { atom } from 'recoil';

export const selectedBankAccountAtom = atom({
    key: "selectedBankAccountState",
    default: {
        AccountId: 7,
        Name: "Natwest"
    }
});