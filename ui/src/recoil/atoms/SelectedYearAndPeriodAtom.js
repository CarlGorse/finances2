import { atom } from "recoil";

export const selectedYearAndPeriodAtom = atom({
    key: "SelectedYearAndPeriodState",
    default: {
        StartYear: 2024,
        EndYear: 2024,
        StartPeriod: 3,
        EndPeriod: 3
    }
});