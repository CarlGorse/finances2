import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { baseUrl as apiBaseUrl, post as apiPost } from 'functions/api.js';
import TransactionHeader from './TransactionHeader';
import TransactionRow from './TransactionRow';
import { bankAccountAtom } from "recoil/atoms/BankAccountAtom";
import { useRecoilValue } from "recoil";

function TransactionList() {

  const [transactions, setTransactions] = useState(null);
  const bankAccount = useRecoilValue(bankAccountAtom);

  useEffect(() => {
    if (bankAccount === null) {
      return () => { };
    }

    apiPost(
      {
        url: apiBaseUrl + "/transactions/get",
        payload: {
          AccountId: bankAccount?.Id,
          CategoryId: 0,
          StartYear: 2024,
          StartPeriod: 2,
          EndYear: 2024,
          EndPeriod: 2,
          FilterType: 0,
          StartEffDate: "09/03/2024",
          EndEffDate: "09/03/2024",
          TransactionId: 0
        },
        callback: (response => {
          setTransactions(response.data.transactions);
        })
      }
    )
  }, [bankAccount])

  if (bankAccount === null) {
    return null;
  }

  return (
    <Container className='mt-5'>
      <TransactionHeader />

      {transactions?.map(transactionTotal => (
        <TransactionRow key={transactionTotal.Transaction.TransactionId} transactionTotal={transactionTotal} />
      ))}
    </Container>
  )
}

export default TransactionList;