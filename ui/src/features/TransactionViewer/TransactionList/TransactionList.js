import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { refreshTransactionsAtom } from "recoil/atoms/RefreshTransactionsAtom";
import { selectedTransactionsAtom } from "recoil/atoms/SelectedTransactionsAtom";
import Spinner from 'components/Spinner'
import { Table } from 'react-bootstrap';
import TransactionHeader from './TransactionHeader';
import TransactionRow from './TransactionRow';
import { transactionSearchAtom } from "recoil/atoms/TransactionSearchAtom";
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

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
  const [transactions, setTransactions] = useState(null);
  const transactionSearch = useRecoilValue(transactionSearchAtom);
  const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);

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
      TransactionId: 0
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        setRefreshTransactions(false);
        setTransactions(response.data.transactions);
        //setSelectedTransactions(null);
        setLoading(false);
      })
  }, [transactionSearch, refreshTransactions, setRefreshTransactions])

  return (
    <Table>

      <TransactionHeader />

      {loading && <Spinner />}

      {!loading && transactions?.map(transactionTotal => (
        <TransactionRow
          key={transactionTotal.Transaction.TransactionId}
          transaction={transactionTotal.Transaction}
          runningTotal={transactionTotal.RunningTotal}
        />
      ))}

    </Table>
  )
}

export default TransactionList;