import { Container, Row } from 'react-bootstrap';
import { loadedTransactionsAtom } from 'common/recoil/atoms/LoadedTransactionsAtom';
import NavigationButtons from './TransactionList/NavigationButtons'
import PageSizeInput from './TransactionList/PageSizeInput'
import { selectedTransactionsAtom } from 'common/recoil/atoms/SelectedTransactionsAtom';
import Spinner from 'common/components/Spinner'
import TransactionHeader from 'common/components/TransactionHeader';
import { transactionsPageNoAtom } from 'common/recoil/atoms/TransactionsPageNoAtom';
import TransactionRow from 'common/components/TransactionRow';
import { useEffect, useState } from 'react';
import useLoadTransactions from './TransactionList/useLoadTransactions';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { yearAndPeriodSearchAtom } from 'common/recoil/atoms/YearAndPeriodSearchAtom';

function TransactionList() {

  const [loading] = useState(null);
  const loadedTransactions = useRecoilValue(loadedTransactionsAtom);
  const [transactionPageNo, setTransactionPageNo] = useRecoilState(transactionsPageNoAtom);
  const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);
  const yearAndPeriodSearch = useRecoilValue(yearAndPeriodSearchAtom);

  useEffect(() => {
    setTransactionPageNo(1);
  }, [setTransactionPageNo, yearAndPeriodSearch])

  useLoadTransactions();

  try {

  }
  catch (error) {
    //setLoading(true)
    /*
        setUserMessage({
          Message: `Unable to load transacitons: ${error.response.data.errors[0]}`,
          Variant: "danger"
        })
        */
  }
  finally {
    //setLoading(false);
  }
  //useEffect(() => {

  //try {
  //;


  //}
  //  finally {

  //    }

  //}, [yearAndPeriodSearch, selectedBankAccount, lastTransactionsLoadDate, pageNo, setUserMessage])

  /*
        */

  return (

    <Container className="table-bordered">

      <PageSizeInput />

      <NavigationButtons
        pageNo={transactionPageNo}
        pageCount={loadedTransactions?.pageCount}
        onClick={pageNo => { setTransactionPageNo(pageNo); }}
      />

      <Row style={{ paddingTop: "10px" }}>
        <TransactionHeader showClearOption={true} />
      </Row>

      {loading && <><Spinner /><span>loading transactions</span></>}

      {!loading && loadedTransactions?.transactions?.map((transaction, index) => (

        <TransactionRow
          key={transaction.TransactionId}
          transaction={transaction}
          backgroundColor={index % 2 === 0 ? "lightGrey" : "white"}
          colorOnSelect="limeGreen"
        />
      ))}

    </Container>
  )
}

export default TransactionList;