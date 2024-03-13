import { atom } from "recoil";

export const errorAtom = atom({
    key: "ErrorState",
    default: {
        Message: null,
        Variant: null
    }
});