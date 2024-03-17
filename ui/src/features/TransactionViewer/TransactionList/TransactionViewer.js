import { Container, Form } from 'react-bootstrap';
import BankAccountSelector from 'features/BankAccountSelector';
import TransactionList from './TransactionList';
import TransactionFilters from '../TransactionFilters/TransactionFilters';
import TransactionOperationButtons from '../TransactionOperationButtons/TransactionOperationButtons';
import TransactionOperationInputs from '../TransactionOperationInputs/TransactionOperationInputs';
import SystemError from '../../../components/SystemError';

function TransactionViewer() {

  return (
    <Container>

      <div style={{ marginTop: "20px" }}>
        <SystemError />
      </div>

      <div style={{ marginTop: "20px" }}>
        <BankAccountSelector />
      </div>

      <div style={{ marginTop: "20px" }}>
        <TransactionFilters />
      </div>

      <div style={{ marginTop: "20px" }}>
        <Form>
          <TransactionOperationButtons />
        </Form>
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