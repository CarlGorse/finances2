import { atom } from 'recoil';

export const showTransactionOperationsSidebarState = atom<boolean>({
    key: "showTransactionOperationsSidebarState",
    default: false
});