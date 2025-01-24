import { atom } from 'recoil';

export const userMessageState = atom({
    key: "userMessageState",
    default: {
        Message: null,
        Variant: null
    }
});