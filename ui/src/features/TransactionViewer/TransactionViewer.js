import { Container, Form } from 'react-bootstrap';
import BankAccountSelector from './Components/BankAccountSelector';
import TransactionList from './Components/TransactionList/TransactionList';
import TransactionFilters from './Components/TransactionSearch/TransactionSearch';
import TransactionOperationButtons from './Components/OperationButtons/OperationButtons';
import OperationPages from './Components/OperationPages/OperationPages';
import UserMessage from 'components/UserMessage'

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
        <UserMessage />
      </div>

      <div style={{ marginTop: "20px", padding: "5px" }}>
        <Form>
          <div style={{ backgroundColor: "cornsilk" }}>
            <OperationPages />
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