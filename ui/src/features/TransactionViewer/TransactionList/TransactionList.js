import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import TransactionHeader from './TransactionHeader';
import TransactionRow from './TransactionRow';
import { transactionSearchAtom } from "recoil/atoms/TransactionSearchAtom";
import { refreshTransactionsAtom } from "recoil/atoms/RefreshTransactionsAtom";
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from "recoil";

import MySpinner from 'components/MySpinner'

function _isTransactionSearchValid(transactionSearch) {
  return transactionSearch.AccountId !== null
    || transactionSearch.StartPeriod !== null
    || transactionSearch.StartYear !== null
    || transactionSearch.EndPeriod !== null
    || transactionSearch.EndYear !== null
}

function TransactionList() {

  const [transactionTotals, setTransactionTotals] = useState(null);
  const transactionSearch = useRecoilValue(transactionSearchAtom);
  const refreshTransactions = useRecoilValue(refreshTransactionsAtom);
  const [loading, setLoading] = useState(null);
  const setRefreshTransactions = useSetRecoilState(refreshTransactionsAtom);

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
        setTransactionTotals(response.data.transactions);
        setLoading(false);
      })
  }, [transactionSearch, refreshTransactions])

  return (
    <>
      <Table>
        <TransactionHeader />

        {loading && <MySpinner />}

        {!loading && transactionTotals?.map(transactionTotal => (
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