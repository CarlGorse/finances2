import { Accordion, Container, Row } from 'react-bootstrap';
import { loadedTransactionsAtom } from 'common/recoil/atoms/LoadedTransactionsAtom';
import Spinner from 'common/components/Spinner'
import TransactionHeader from 'common/components/TransactionHeader';
import TransactionRow from 'common/components/TransactionRow';
import { useState } from 'react';
import useLoadTransactions from './TransactionList/useLoadTransactions';
import { useRecoilValue } from 'recoil';

function TransactionList() {

  const [loading] = useState(null);
  const loadedTransactions = useRecoilValue(loadedTransactionsAtom);

  useLoadTransactions();

  return (

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