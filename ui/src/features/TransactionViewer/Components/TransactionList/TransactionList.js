import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import { lastTransactionsLoadDateAtom } from "recoil/atoms/LastTransactionsLoadDateAtom";
import NavigationButtons from './Components/NavigationButtons'
import { selectedBankAccountAtom } from "recoil/atoms/SelectedBankAccountAtom";
import { selectedTransactionsAtom } from "recoil/atoms/SelectedTransactionsAtom";
import { selectedYearAndPeriodAtom } from "recoil/atoms/SelectedYearAndPeriodAtom";
import Spinner from 'components/Spinner'
import TransactionHeader from 'components/TransactionHeader';
import TransactionRow from 'components/TransactionRow';
import { useEffect, useRef, useState } from 'react';
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';
import { useRecoilValue, useSetRecoilState } from "recoil";

function TransactionList() {

  const lastTransactionsLoadDate = useRecoilValue(lastTransactionsLoadDateAtom);
  const [loading, setLoading] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const selectedBankAccount = useRecoilValue(selectedBankAccountAtom);
  const selectedYearAndPeriod = useRecoilValue(selectedYearAndPeriodAtom);
  const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);
  const setUserMessage = useSetRecoilState(userMessageAtom);
  const [transactions, setTransactions] = useState(null);

  const pageCount = useRef(1);

  useEffect(() => {
    setPageNo(1);
  }, [selectedYearAndPeriod])

  useEffect(() => {

    if (!_isSearchCriteriaValid()
    ) {
      return () => { };
    }

    setLoading(true);

    axios.post(apiBaseUrl + "/transactions/get", {
      searchCriteria: {
        AccountId: selectedBankAccount.AccountId,
        StartYear: selectedYearAndPeriod.StartYear,
        StartPeriod: selectedYearAndPeriod.StartPeriod,
        EndYear: selectedYearAndPeriod.EndYear,
        EndPeriod: selectedYearAndPeriod.EndPeriod,
      },
      PageNo: pageNo,
      IncludeRunningTotals: true,
      IncludeWageTotals: true
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {

        setTransactions(response.data.transactions);

        pageCount.current = response.data.PageCount;

        setLoading(false);
      })
      .catch(function (error) {
        pageCount.current = 0;

        setUserMessage({
          Message: `Unable to load transacitons: ${error.response.data.errors[0]}`,
          Variant: "danger"
        })
      })
  }, [selectedYearAndPeriod, selectedBankAccount, lastTransactionsLoadDate, pageNo, setUserMessage])

  function _isSearchCriteriaValid() {
    return selectedBankAccount !== null
      || selectedYearAndPeriod.StartPeriod !== null
      || selectedYearAndPeriod.StartYear !== null
      || selectedYearAndPeriod.EndPeriod !== null
      || selectedYearAndPeriod.EndYear !== null
  }

  return (

    <Container className="table-bordered">

      <NavigationButtons
        pageNo={pageNo}
        pageCount={pageCount.current}
        onClick={(pageNo) => setPageNo(pageNo)}
      />

      <Row style={{ paddingTop: "10px" }}>
        <TransactionHeader />
      </Row>

      {loading && <><Spinner /><span>loading transactions</span></>}

      {!loading && transactions?.map((transaction, index) => (

        <TransactionRow
          key={transaction.TransactionId}
          transaction={transaction}
          backgroundColor={index % 2 === 0 ? "lightGrey" : "white"}
          colorOnSelect="limeGreen"
        />
      ))}

      <NavigationButtons
        pageNo={pageNo}
        pageCount={pageCount.current}
        onClick={(pageNo) => {
          setPageNo(pageNo)
          setSelectedTransactions(null)
        }}
      />

    </Container>
  )
}

export default TransactionList;