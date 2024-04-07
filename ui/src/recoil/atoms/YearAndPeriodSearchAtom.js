import { atom } from "recoil";

export const yearAndPeriodSearchAtom = atom({
    key: "YearAndPeriodSearchState",
    default: {
        StartYear: 2024,
        EndYear: 2024,
        StartPeriod: 3,
        EndPeriod: 3
    }
});