import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import NavigationButtons from './NavigationButtons'
import { refreshTransactionsAtom } from "recoil/atoms/RefreshTransactionsAtom";
import Spinner from 'components/Spinner'
import { Table } from 'react-bootstrap';
import TransactionHeader from './TransactionHeader';
import TransactionRow from './TransactionRow';
import { transactionSearchAtom } from "recoil/atoms/TransactionSearchAtom";
import { useEffect, useRef, useState } from 'react';
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function _isTransactionSearchValid(transactionSearch) {
  return transactionSearch.AccountId !== null
    || transactionSearch.StartPeriod !== null
    || transactionSearch.StartYear !== null
    || transactionSearch.EndPeriod !== null
    || transactionSearch.EndYear !== null
}

function TransactionList() {

  const [loading, setLoading] = useState(null);
  const [refreshTransactions, setRefreshTransactions] = useRecoilState(refreshTransactionsAtom);
  const setUserMessage = useSetRecoilState(userMessageAtom);
  const [transactions, setTransactions] = useState(null);
  const transactionSearch = useRecoilValue(transactionSearchAtom);
  const [pageNo, setPageNo] = useState(1);

  const pageCount = useRef(0);

  useEffect(() => {
    setPageNo(1);
  }, [transactionSearch])

  useEffect(() => {

    if (!_isTransactionSearchValid(transactionSearch)
    ) {
      return () => { };
    }

    setLoading(true);

    axios.post(apiBaseUrl + "/transactions/get", {
      AccountId: transactionSearch.AccountId,
      CategoryId: 0,
      StartYear: transactionSearch.StartYear,
      StartPeriod: transactionSearch.StartPeriod,
      EndYear: transactionSearch.EndYear,
      EndPeriod: transactionSearch.EndPeriod,
      FilterType: 0,
      StartEffDate: "09/03/2024",
      EndEffDate: "09/03/2024",
      TransactionId: 0,
      PageNo: pageNo
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        setTransactions(response.data.transactions);

        pageCount.current = response.data.pageCount;

        setLoading(false);
      })
      .catch(function (error) {
        pageCount.current = 0;

        setUserMessage({
          Message: error.response.data.validationErrors[0],
          Variant: "danger"
        })
      })
  }, [transactionSearch, refreshTransactions, pageNo])

  function onClickFirst() {
    setPageNo(1)
  }

  function onClickPrev() {
    setPageNo(prevValue => Math.max(prevValue - 1, 0))
  }

  function onClickNext() {
    setPageNo(prevValue => {
      return Math.min(prevValue + 1, pageCount.current)
    })
  }

  function onClickLast() {
    setPageNo(pageCount.current)
  }

  return (
    <>

      <Table className="table-bordered">

        <div style={{ paddingLeft: "10px", paddingTop: "10px" }}>
          <NavigationButtons
            pageNo={pageNo}
            pageCount={pageCount.current}
            onClickFirst={() => onClickFirst()}
            onClickPrev={() => onClickPrev()}
            onClickNext={() => onClickNext()}
            onClickLast={() => onClickLast()}
          />
        </div>

        <div style={{ paddingTop: "10px" }}>
          <TransactionHeader />
        </div>

        {loading && <Spinner />}

        {!loading && transactions?.map(transactionTotal => (
          <TransactionRow
            key={transactionTotal.Transaction.TransactionId}
            transaction={transactionTotal.Transaction}
            runningTotal={transactionTotal.RunningTotal}
          />
        ))}

      </Table>
    </>
  )
}

export default TransactionList;