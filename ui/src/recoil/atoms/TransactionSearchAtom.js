import { atom } from "recoil";

export const transactionSearchAtom = atom({
    key: "transactionSearchState",
    default: {
        AccountId: 3,
        StartYear: 2024,
        EndYear: 2024,
        StartPeriod: 1,
        EndPeriod: 3
    }
});