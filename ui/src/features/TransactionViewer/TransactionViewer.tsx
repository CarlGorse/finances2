import { Container } from 'react-bootstrap';
import TransactionBanner from './TransactionBanner'
import TransactionList from './TransactionList';
import { transactionOperationAtom } from 'common/recoil/atoms/TransactionOperationAtom';
import { transactionsPageNoAtom } from 'common/recoil/atoms/TransactionsPageNoAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react'
import { yearAndPeriodSearchAtom } from 'common/recoil/atoms/YearAndPeriodSearchAtom';
import YearAndPeriodSearch from 'types/YearAndPeriodSearch'

function TransactionViewer() {

  const transactionOperation = useRecoilValue(transactionOperationAtom);
  const setTransactionPageNo = useSetRecoilState(transactionsPageNoAtom);
  const [, setShow] = useState(false);
  const setYearAndPeriodSearch = useSetRecoilState<YearAndPeriodSearch>(yearAndPeriodSearchAtom);

  useEffect(() => {

    setTransactionPageNo(1);

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    setYearAndPeriodSearch({
      StartPeriod: currentMonth,
      StartYear: currentYear,
      EndPeriod: currentMonth,
      EndYear: currentYear
    });

  }, [setTransactionPageNo, setYearAndPeriodSearch])

  useEffect(() => {
    if (transactionOperation) {
      setShow(true);
    }
  }, [transactionOperation])

  return (

    <Container>

      <div style={{ position: "sticky", top: "3em", backgroundColor: "white", zIndex: "1" }} >
        <TransactionBanner />
      </div>

      <div className="mt-3">
        <TransactionList />
      </div>

    </Container >
  )
}

export default TransactionViewer;