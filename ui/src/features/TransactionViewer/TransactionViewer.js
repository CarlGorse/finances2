import BankAccountSelector from './Components/BankAccountSelector';
import { Container } from 'react-bootstrap';
import OperationButtons from './Components/OperationButtons/OperationButtons';
import OperationPage from './Components/OperationPage/OperationPage';
import TransactionList from './Components/TransactionList/TransactionList';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState } from "recoil";
import UserMessage from 'components/UserMessage'
import { useEffect, useState } from 'react'
import YearAndPeriodSelector from './Components/YearAndPeriodSelector';

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
        <YearAndPeriodSelector />
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