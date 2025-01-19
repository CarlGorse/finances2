import { atom } from 'recoil';

export const categoryReportPeriodsState = atom<number>({
    key: "categoryReportPeriodsState",
    default: 6
});