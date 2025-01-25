import { atom } from 'recoil';

import TransactionsPageData from 'types/TransactionsPageData';

export const transactionsPageDataState = atom<TransactionsPageData>({
    key: "transactionsPageDateState",
    default: {
        PageNo: 1,
        PageSize: 10
    }
});