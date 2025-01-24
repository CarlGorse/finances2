
import LoadedTransactions from 'types/LoadedTransactions'
import NavigationButtons from '../TransactionList/NavigationButtons/NavigationButtons'

import { loadedTransactionsState } from 'recoil/atoms/LoadedTransactionsAtom';
import { transactionsPageNoState } from 'recoil/atoms/TransactionsPageNoAtom';
import { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil'

export default function TransactionBanner() {

  const loadedTransactions = useRecoilValue<LoadedTransactions>(loadedTransactionsState);
  const [transactionPageNo, setTransactionPageNo] = useRecoilState(transactionsPageNoState);

  useEffect(() => {
    setTransactionPageNo(1);
  })

  return (
    <div className="mt-3">
      <NavigationButtons
        pageNo={transactionPageNo}
        pageCount={loadedTransactions?.pageCount}
        onClick={pageNo => { setTransactionPageNo(pageNo); }}
      />
    </div>
  );
}