import Dropdown from 'react-bootstrap/Dropdown';
import { bankAccountsAtom } from 'common/recoil/atoms/BankAccountsAtom';
import { selectedTransactionsAtom } from 'common/recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'common/recoil/atoms/TransactionOperationAtom';
import { selectedBankAccountAtom } from 'common/recoil/atoms/SelectedBankAccountAtom';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

function BankAccountSelector() {

  const bankAccounts = useRecoilValue(bankAccountsAtom);
  const [title, setTitle] = useState("");
  const [selectedBankAccount, setSelectedBankAccount] = useRecoilState(selectedBankAccountAtom);

  const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);
  const setTransactionOperation = useSetRecoilState(transactionOperationAtom);

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
                <div onClick={(e) => {
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
