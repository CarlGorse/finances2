import { Container } from 'react-bootstrap';
import BankAccountSelector from 'features/BankAccountSelector';
import TransactionsList from './TransactionsList';
import { useState } from 'react';

function TransactionsViewer() {

  const [getSelectedBankAccount, setSelectedBankAccount] = useState(null);

  return (
    <Container>

      <BankAccountSelector onSelect={(bankAccount) => setSelectedBankAccount(bankAccount)} />

      <TransactionsList bankAccountName={getSelectedBankAccount} />

    </Container >
  );
}

export default TransactionsViewer;
