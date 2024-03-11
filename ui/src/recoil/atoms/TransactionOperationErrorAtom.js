import { atom } from "recoil";

export const transactionOperationErrorAtom = atom({
    key: "transactionOperationErrorState",
    default: {
        Message: null,
        Variant: "error"
    }
});