import axios from 'axios';
import { apiBaseUrl } from 'common/consts/ApiConsts';
import Dropdown from 'react-bootstrap/Dropdown';
import { selectedTransactionsAtom } from 'common/recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'common/recoil/atoms/TransactionOperationAtom';
import { selectedBankAccountAtom } from 'common/recoil/atoms/SelectedBankAccountAtom';
import { useEffect, useState } from 'react';
import { userMessageAtom } from 'common/recoil/atoms/UserMessageAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';

function BankAccountSelector() {

  const [bankAccounts, setBankAccounts] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedBankAccount, setSelectedBankAccount] = useRecoilState(selectedBankAccountAtom);

  const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);
  const setTransactionOperation = useSetRecoilState(transactionOperationAtom);
  const setUserMessage = useSetRecoilState(userMessageAtom);

  useEffect(() => {
    axios.get(apiBaseUrl + "/bankAccounts/get")
      .then(response => {
        setUserMessage({ Error: null, Variant: null });
        setBankAccounts(response.data.Accounts);
        selectBankAccount(response.data.Accounts.filter(x => x.AccountId === selectedBankAccount.AccountId)[0] ?? response.data.Accounts[0])
      })
      .catch((response) => {
        setUserMessage({ Message: "Unable to load bank accounts", Variant: "danger" })
      }
      )
  }, [setUserMessage])

  function selectBankAccount(bankAccount) {
    ClearSelectedTransactionsAndOperation();
    setTitle(bankAccount.Name);
    if (bankAccount.AccountId !== selectedBankAccount.AccountId) {
      setSelectedBankAccount(bankAccount);
    }
  };

  function ClearSelectedTransactionsAndOperation() {
    setSelectedTransactions(null);
    setTransactionOperation(null);
  }

  if (bankAccounts === null) {
    return;
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

                  let bankAccount = bankAccounts.find(bankAccount => bankAccount.Name === e.target.textContent)

                  selectBankAccount(bankAccount);

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
