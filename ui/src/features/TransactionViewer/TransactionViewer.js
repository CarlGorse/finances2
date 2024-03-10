import { Container, Form } from 'react-bootstrap';
import BankAccountSelector from 'features/BankAccountSelector';
import TransactionList from './TransactionList/TransactionList';
import TransactionSearch from './TransactionSearch/TransactionSearch';
import TransactionOperations from './TransactionOperations/TransactionOperations';
import TransactionOperationError from './TransactionOperationError';

function TransactionViewer() {

  return (
    <Container>

      <BankAccountSelector />

      <TransactionSearch />

      <Form>
        <TransactionOperations />
      </Form>

      <TransactionOperationError />

      <TransactionList />

    </Container >
  );
}

export default TransactionViewer;