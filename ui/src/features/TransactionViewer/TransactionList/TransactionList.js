import { baseUrl as apiBaseUrl, post as apiPost } from 'functions/api.js';
import { Table } from 'react-bootstrap';
import TransactionHeader from './TransactionHeader';
import TransactionRow from './TransactionRow';
import { transactionSearchAtom } from "recoil/atoms/TransactionSearchAtom";
import { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";

import MySpinner from 'components/MySpinner'

function TransactionList() {

  const [transactionTotals, setTransactionTotals] = useState(null);
  const transactionSearch = useRecoilValue(transactionSearchAtom);
  const [loading, setLoading] = useState(null);

  useEffect(() => {

    if (
      transactionSearch.AccountId === null
      || transactionSearch.StartPeriod === null
      || transactionSearch.StartYear === null
      || transactionSearch.EndPeriod === null
      || transactionSearch.EndYear === null
    ) {
      return () => { };
    }

    setLoading(true);

    apiPost(
      {
        url: apiBaseUrl + "/transactions/get",
        payload: {
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
        },
        callback: (response => {
          setTransactionTotals(response.data.transactions);
          setLoading(false);;
        })
      }
    )
  }, [transactionSearch])

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