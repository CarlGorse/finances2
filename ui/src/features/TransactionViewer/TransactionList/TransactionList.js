import { Accordion, Container, Row } from 'react-bootstrap';
import { loadedTransactionsState } from 'recoil/atoms/LoadedTransactionsAtom';
import Spinner from 'components/FinancesSpinner'
import TransactionRow from './TransactionRow/TransactionRow';
import { transactionLoadingProgressState } from 'recoil/atoms/TransactionLoadingProgressState';
import { useState } from 'react';
import useLoadTransactions from './useLoadTransactions';
import { useRecoilValue } from 'recoil';


function TransactionList() {

  const [loading] = useState(null);
  const loadedTransactions = useRecoilValue(loadedTransactionsState);
  const transactionLoadingProgress = useRecoilValue(transactionLoadingProgressState);

  useLoadTransactions();

  return (

    transactionLoadingProgress === "loading" ? <Spinner /> :

      <Container style={{ border: "1px solid lightGrey" }}>

        <Row className="mt-4">
          <TransactionHeader showClearOption={true} />
        </Row>

        {loading && <><Spinner /><span>loading transactions</span></>}

        {!loading && loadedTransactions?.transactions?.map((transaction, index) => (
          <Accordion>
            <div className="mt-1">
              <TransactionRow
                key={transaction.TransactionId}
                transaction={transaction}
                backgroundColor={index % 2 === 0 ? "lightGrey" : "white"}
                colorOnSelect="limeGreen"
              />
            </div>
          </Accordion>
        ))}

      </Container>
  )
}

export default TransactionList;