import { atom } from "recoil";

export const transactionSearchAtom = atom({
    key: "transactionSearchState",
    default: {
        AccountId: null,
        StartYear: null,
        EndYear: null,
        StartPeriod: null,
        EndPeriod: null
    },
});