
import LoadedTransactions from 'types/LoadedTransactions'
import NavigationButtons from '../TransactionList/NavigationButtons/NavigationButtons'
import TransactionsPageData from 'types/TransactionsPageData';

import { loadedTransactionsState } from 'recoil/atoms/LoadedTransactionsState';
import { transactionsPageDataState } from 'recoil/atoms/TransactionsPageDataState';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function TransactionBanner() {

  const loadedTransactions = useRecoilValue<LoadedTransactions>(loadedTransactionsState);
  const pageData = useRecoilValue(transactionsPageDataState);

  const setPageData = useSetRecoilState<TransactionsPageData>(transactionsPageDataState);

  return (
    <div className="mt-3">
      <NavigationButtons
        pageNo={pageData.PageNo}
        pageCount={loadedTransactions?.pageCount}
        onClick={pageNo => { setPageData(prevState => ({ ...prevState, PageNo: pageNo })); }}
      />
    </div>
  );
}