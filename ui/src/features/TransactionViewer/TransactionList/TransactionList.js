import { Accordion, Container, Row } from 'react-bootstrap';
import { loadedTransactionsState } from 'recoil/atoms/LoadedTransactionsAtom';
import Spinner from 'components/FinancesSpinner'
import TransactionHeader from 'components/TransactionHeader';
import TransactionRow from 'components/TransactionRow';
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

      <Container className="table-bordered">

        <Row style={{ paddingTop: "10px" }}>
          <TransactionHeader showClearOption={true} />
        </Row>

        {loading && <><Spinner /><span>loading transactions</span></>}

        {!loading && loadedTransactions?.transactions?.map((transaction, index) => (
          <Accordion>
            <TransactionRow
              key={transaction.TransactionId}
              transaction={transaction}
              backgroundColor={index % 2 === 0 ? "lightGrey" : "white"}
              colorOnSelect="limeGreen"
            />
          </Accordion>
        ))}

      </Container>
  )
}

export default TransactionList;