import Dropdown from 'react-bootstrap/Dropdown';
import { bankAccountsState } from 'recoil/atoms/BankAccountsState';
import useClearSelectedTransactions from 'hooks/useClearSelectedTransactions';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationState';
import { selectedBankAccountState } from 'recoil/atoms/SelectedBankAccountState';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

export default function BankAccountSelector() {

  const bankAccounts = useRecoilValue(bankAccountsState);
  const clearSelectedTransactions = useClearSelectedTransactions();
  const [selectedBankAccount, setSelectedBankAccount] = useRecoilState(selectedBankAccountState);
  const setTransactionOperation = useSetRecoilState(transactionOperationState);
  const [title, setTitle] = useState("");

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
    clearSelectedTransactions();
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