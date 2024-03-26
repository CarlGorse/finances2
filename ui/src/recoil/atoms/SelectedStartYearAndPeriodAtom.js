import { atom } from "recoil";

export const selectedStartYearAndPeriodAtom = atom({
    key: "SelectedStartYearAndPeriodState",
    default: {
        StartYear: 2024,
        StartPeriod: 3
    }
});