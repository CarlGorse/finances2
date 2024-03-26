import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { doRefreshTransactionsAtom } from "recoil/atoms/DoRefreshTransactionsAtom";
import NavigationButtons from './Components/NavigationButtons'
import { selectedTransactionsAtom } from "recoil/atoms/SelectedTransactionsAtom";
import Spinner from 'components/Spinner'
import { Table } from 'react-bootstrap';
import TransactionHeader from './Components/TransactionHeader';
import TransactionRow from './TransactionRow/TransactionRow';
import { transactionSearchCriteriaAtom } from "recoil/atoms/TransactionSearchCriteriaAtom";
import { useEffect, useRef, useState } from 'react';
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';
import { useRecoilValue, useSetRecoilState } from "recoil";

function _isTransactionSearchValid(transactionSearch) {
  return transactionSearch.AccountId !== null
    || transactionSearch.StartPeriod !== null
    || transactionSearch.StartYear !== null
    || transactionSearch.EndPeriod !== null
    || transactionSearch.EndYear !== null
}

function TransactionList() {

  const doRefreshTransactions = useRecoilValue(doRefreshTransactionsAtom);
  const [loading, setLoading] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);
  const setUserMessage = useSetRecoilState(userMessageAtom);
  const [transactions, setTransactions] = useState(null);
  const transactionSearch = useRecoilValue(transactionSearchCriteriaAtom);

  const pageCount = useRef(1);

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
      StartYear: transactionSearch.StartYear,
      StartPeriod: transactionSearch.StartPeriod,
      EndYear: transactionSearch.EndYear,
      EndPeriod: transactionSearch.EndPeriod,
      PageNo: pageNo
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
          Message: error.response.data.errors[0],
          Variant: "danger"
        })
      })
  }, [transactionSearch, doRefreshTransactions, pageNo, setUserMessage])

  return (
    <>

      <Table className="table-bordered">

        <div style={{ paddingLeft: "10px", paddingTop: "10px" }}>
          <NavigationButtons
            pageNo={pageNo}
            pageCount={pageCount.current}
            onClick={(pageNo) => setPageNo(pageNo)}
          />
        </div>

        <div style={{ paddingTop: "10px" }}>
          <TransactionHeader />
        </div>

        {loading && <Spinner />}

        {!loading && transactions?.map((transaction, index) => (

          <TransactionRow
            key={transaction.TransactionId}
            transaction={transaction}
            backgroundColor={index % 2 === 0 ? "lightGrey" : "white"}
          />
        ))}

        <div style={{ paddingLeft: "20px", paddingTop: "30px" }}>
          <NavigationButtons
            pageNo={pageNo}
            pageCount={pageCount.current}
            onClick={(pageNo) => {
              setPageNo(pageNo)
              setSelectedTransactions(null)
            }
            }
          />
        </div>

      </Table>
    </>
  )
}

export default TransactionList;