import { atom } from 'recoil';

export const showSearchSidebarState = atom<boolean>({
    key: "showSearchSidebarState",
    default: false
});