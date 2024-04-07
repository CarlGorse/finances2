import { Container, Row } from 'react-bootstrap';
import { loadedTransactionsAtom } from "recoil/atoms/LoadedTransactionsAtom";
import NavigationButtons from './NavigationButtons/NavigationButtons'
import PageSizeInput from './PageSizeInput'
import { selectedTransactionsAtom } from "recoil/atoms/SelectedTransactionsAtom";
import Spinner from 'components/Spinner'
import TransactionHeader from 'components/TransactionHeader';
import TransactionRow from 'components/TransactionRow';
import { useEffect, useState } from 'react';
import useLoadTransactions from './hooks/useLoadTransactions';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { yearAndPeriodSearchAtom } from 'recoil/atoms/YearAndPeriodSearchAtom';

function TransactionList() {

  const [loading] = useState(null);
  const loadedTransactions = useRecoilValue(loadedTransactionsAtom);
  const [pageNo, setPageNo] = useState(1);
  const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);
  const yearAndPeriodSearch = useRecoilValue(yearAndPeriodSearchAtom);

  useEffect(() => {
    setPageNo(1);
  }, [yearAndPeriodSearch])

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
        pageNo={pageNo}
        pageCount={loadedTransactions?.pageCount}
        onClick={(pageNo) => { setPageNo(pageNo); }}
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

      <NavigationButtons
        pageNo={pageNo}
        pageCount={loadedTransactions?.pageCount}
        onClick={(pageNo) => {
          setPageNo(pageNo)
          setSelectedTransactions(null)
        }}
      />

    </Container>
  )
}

export default TransactionList;