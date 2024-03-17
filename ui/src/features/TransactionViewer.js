import { Container, Form } from 'react-bootstrap';
import BankAccountSelector from 'features/BankAccountSelector';
import TransactionList from './TransactionViewer/TransactionList/TransactionList';
import TransactionFilters from './TransactionViewer/TransactionFilters/TransactionFilters';
import TransactionOperationButtons from './TransactionViewer/TransactionOperationButtons/TransactionOperationButtons';
import TransactionOperationInputs from './TransactionViewer/TransactionOperationInputs/TransactionOperationInputs';
import SystemError from 'components/SystemError';

function TransactionViewer() {

  return (
    <Container>

      <BankAccountSelector />

      <div style={{ marginTop: "20px" }}>
        <TransactionFilters />
      </div>

      <div style={{ marginTop: "20px" }}>
        <Form>
          <TransactionOperationButtons />
        </Form>
      </div>

      <div style={{ marginTop: "20px" }}>
        <SystemError />
      </div>

      <div style={{ marginTop: "20px", padding: "5px" }}>
        <Form>
          <div style={{ backgroundColor: "cornsilk" }}>
            <TransactionOperationInputs />
          </div>
        </Form>
      </div>

      <div style={{ marginTop: "20px" }}>
        <TransactionList />
      </div>

    </Container >
  );
}

export default TransactionViewer;