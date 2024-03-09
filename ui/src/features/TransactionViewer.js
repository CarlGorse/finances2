import { Container } from 'react-bootstrap';
import BankAccountSelector from 'features/BankAccountSelector';
import TransactionList from './TransactionList/TransactionList';
import TransactionSearch from './TransactionSearch';

function TransactionViewer() {

  return (
    <Container>

      <BankAccountSelector />

      <TransactionSearch />

      <TransactionList />

    </Container >
  );
}

export default TransactionViewer;
