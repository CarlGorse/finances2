import axios from 'axios';
import { apiBaseUrl } from 'functions/Api';
import Dropdown from 'react-bootstrap/Dropdown';
import { selectedBankAccountAtom } from 'recoil/atoms/SelectedBankAccountAtom';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useEffect, useState } from 'react';
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';
import { useSetRecoilState } from "recoil";

function BankAccountSelector() {

  const [title, setTitle] = useState("");
  const [bankAccounts, setBankAccounts] = useState(null);

  const setSelectedBankAccount = useSetRecoilState(selectedBankAccountAtom);
  const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);
  const setTransactionOperation = useSetRecoilState(transactionOperationAtom);
  const setUserMessage = useSetRecoilState(userMessageAtom);

  useEffect(() => {
    axios.get(apiBaseUrl + "/bankAccounts/get")
      .then(response => {
        setUserMessage({ Error: null, Variant: null });
        setBankAccounts(response.data.Accounts);
      })
      .catch(
        setUserMessage({ Message: "Unable to load bank accounts", Variant: "danger" })
      )
  }, [setUserMessage])

  const selectBankAccount = (bankAccount) => {
    ClearSelectedTransactionsAndOperation();
    setTitle(bankAccount.Name);
    setSelectedBankAccount(bankAccount)
  };

  function ClearSelectedTransactionsAndOperation() {
    setSelectedTransactions(null);
    setTransactionOperation(null);
  }

  if (bankAccounts === null) {
    return;
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" >
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
  );
}

export default BankAccountSelector;
