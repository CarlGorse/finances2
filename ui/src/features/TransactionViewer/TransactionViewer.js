import BankAccountSelector from './Components/BankAccountSelector';
import { Container } from 'react-bootstrap';
import OperationButtons from './Components/OperationButtons/OperationButtons';
import OperationPages from './Components/OperationPages/OperationPages';
import TransactionList from './Components/TransactionList/TransactionList';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilValue } from "recoil";
import UserMessage from 'components/UserMessage'
import YearAndPeriodSelector from './Components/YearAndPeriodSelector';

function TransactionViewer() {

  const transactionOperation = useRecoilValue(transactionOperationAtom);

  let operationPagesMarkup;

  if (transactionOperation) {
    operationPagesMarkup = <OperationPages />
  }

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
        {operationPagesMarkup}
      </div>

      <div style={{ marginTop: "20px" }}>
        <TransactionList />
      </div>

    </Container >
  );
}

export default TransactionViewer;