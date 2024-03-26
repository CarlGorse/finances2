import { atom } from "recoil";

export const transactionSearchCriteriaAtom = atom({
    key: "transactionSearchCriteriaState",
    default: {
        AccountId: 7,
        StartYear: 2024,
        EndYear: 2024,
        StartPeriod: 3,
        EndPeriod: 3
    }
});