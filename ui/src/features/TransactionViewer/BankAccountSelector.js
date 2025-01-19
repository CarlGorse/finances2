import Dropdown from 'react-bootstrap/Dropdown';
import { bankAccountsState } from 'recoil/atoms/BankAccountsAtom';
import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationAtom';
import { selectedBankAccountState } from 'recoil/atoms/SelectedBankAccountAtom';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

function BankAccountSelector() {

  const bankAccounts = useRecoilValue(bankAccountsState);
  const [title, setTitle] = useState("");
  const [selectedBankAccount, setSelectedBankAccount] = useRecoilState(selectedBankAccountState);

  const setSelectedTransactions = useSetRecoilState(selectedTransactionsState);
  const setTransactionOperation = useSetRecoilState(transactionOperationState);

  useEffect(
    () => {

      if (selectedBankAccount) {
        selectBankAccount(selectedBankAccount.AccountId)
        setTitle(selectedBankAccount.Name);
      }
    }, [selectedBankAccount]
  );

  function selectBankAccount(id) {

    if (id === selectedBankAccount.AccountId) {
      return;
    }

    let bankAccount = bankAccounts.find(bankAccount => bankAccount.AccountId === id)
    setSelectedBankAccount(bankAccount);

    ClearSelectedTransactionsAndOperation();
  };

  function ClearSelectedTransactionsAndOperation() {
    setSelectedTransactions(null);
    setTransactionOperation(null);
  }

  return (
    <>

      <label>Bank account:</label>

      <Dropdown>

        <Dropdown.Toggle size="md" variant="success" id="dropdown-basic" >
          {title}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {
            bankAccounts?.map(bankAccount => (

              <Dropdown.Item key={bankAccount.AccountId} as="button" >
                <div onClick={() => {
                  selectBankAccount(bankAccount.AccountId);
                }}>
                  {bankAccount.Name}
                </div>
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown >
    </>
  );
}

export default BankAccountSelector;
