import { atom } from 'recoil';
import YearAndPeriodSearch from 'types/YearAndPeriodSearch'

export const yearAndPeriodSearchAtom = atom<YearAndPeriodSearch>({
    key: "YearAndPeriodSearchState",
    default: {
        StartYear: 2024,
        EndYear: 2024,
        StartPeriod: 3,
        EndPeriod: 3
    }
});