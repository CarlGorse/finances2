import { Col, Container, Row } from 'react-bootstrap';
import BankAccountSelector from 'features/BankAccountSelector';

function TransactionsViewer() {
  return (
    <Container>

      <BankAccountSelector />

    </Container >
  );
}

export default TransactionsViewer;
