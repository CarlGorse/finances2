import { atom } from "recoil";

export const userMessageAtom = atom({
    key: "userMessageState",
    default: {
        Message: null,
        Variant: null
    }
});