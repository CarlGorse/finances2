import { atom } from 'recoil';
import YearAndPeriodSearch from 'types/YearAndPeriodSearch'

export const yearAndPeriodSearchState = atom<YearAndPeriodSearch>({
    key: "YearAndPeriodSearchState",
    default: {
        StartYear: null,
        EndYear: null,
        StartPeriod: null,
        EndPeriod: null
    }
});