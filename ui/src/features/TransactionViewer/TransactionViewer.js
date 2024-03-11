import { Container, Form } from 'react-bootstrap';
import BankAccountSelector from 'features/BankAccountSelector';
import TransactionList from './TransactionList/TransactionList';
import TransactionSearch from './TransactionSearch/TransactionSearch';
import TransactionOperationButtons from './TransactionOperationButtons/Buttons';
import TransactionOperationInputs from './TransactionOperationInputs/TransactionOperationInputs';
import TransactionOperationError from './TransactionOperationError';

function TransactionViewer() {

  return (
    <Container>

      <BankAccountSelector />

      <div style={{ paddingTop: "20px" }}>
        <TransactionSearch />
      </div>

      <div style={{ paddingTop: "20px" }}>
        <Form>
          <TransactionOperationButtons />
        </Form>
      </div>

      <div style={{ paddingTop: "20px" }}>
        <Form>
          <TransactionOperationInputs />
        </Form>
      </div>

      <div style={{ paddingTop: "10px" }}>
        <TransactionOperationError />
      </div>

      <TransactionList />

    </Container >
  );
}

export default TransactionViewer;