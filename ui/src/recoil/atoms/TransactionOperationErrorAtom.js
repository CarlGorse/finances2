import { atom } from "recoil";

export const transactionOperationErrorAtom = atom({
    key: "transactionOperationErrorState",
    default: {
        message: null,
        variant: "error"
    }
});