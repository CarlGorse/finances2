import { atom } from "recoil";

export const systemErrorAtom = atom({
    key: "systemErrorState",
    default: {
        Message: null,
        Variant: null
    }
});