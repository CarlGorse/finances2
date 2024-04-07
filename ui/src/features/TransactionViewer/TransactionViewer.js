import BankAccountSelector from './BankAccountSelector';
import { Container } from 'react-bootstrap';
import OperationButtons from './OperationButtons';
import OperationPage from './OperationPage';
import TransactionList from './TransactionList';
import { transactionOperationAtom } from 'common/recoil/atoms/TransactionOperationAtom';
import { useRecoilState } from 'recoil';
import UserMessage from 'common/components/UserMessage'
import { useEffect, useState } from 'react'
import YearsAndPeriodsSearch from './YearsAndPeriodsSearch';

function TransactionViewer() {

  const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (transactionOperation) {
      setShow(true);
    }
  }, [transactionOperation])

  return (

    <Container>

      <BankAccountSelector />

      <div style={{ marginTop: "20px" }}>
        <YearsAndPeriodsSearch />
      </div>

      <div style={{ marginTop: "30px" }}>
        <OperationButtons />
      </div>

      <div style={{ marginTop: "20px" }}>
        <UserMessage />
      </div>

      <div style={{ marginTop: "20px" }}>
        <OperationPage show={show} handleClose={() => { setShow(false); setTransactionOperation(null); }} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <TransactionList />
      </div>

    </Container >
  );
}

export default TransactionViewer;