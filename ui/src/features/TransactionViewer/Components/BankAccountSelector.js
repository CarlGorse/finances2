import axios from 'axios';
import { apiBaseUrl } from 'functions/Api';
import Dropdown from 'react-bootstrap/Dropdown';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { transactionSearchAtom } from 'recoil/atoms/TransactionSearchAtom';
import { useEffect, useState } from 'react';
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';
import { useRecoilState, useSetRecoilState } from "recoil";

function BankAccountSelector() {

  const [bankAccounts, setBankAccounts] = useState(null);
  const [title, setTitle] = useState("");
  const [transactionSearch, setTransactionSearch] = useRecoilState(transactionSearchAtom);

  const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);
  const setTransactionOperation = useSetRecoilState(transactionOperationAtom);
  const setUserMessage = useSetRecoilState(userMessageAtom);

  function UpdateTransactionSearch(propertyName, value) {
    setTransactionSearch(prevState => ({ ...prevState, [propertyName]: value }))
  }

  useEffect(() => {
    axios.get(apiBaseUrl + "/bankAccounts/get")
      .then(response => {
        setUserMessage({ Error: null, Variant: null });
        setBankAccounts(response.data.Accounts);
        selectBankAccount(response.data.Accounts.filter(x => x.AccountId === transactionSearch.AccountId)[0])
      })
      .catch(
        setUserMessage({ Message: "Unable to load bank accounts", Variant: "danger" })
      )
  }, [setUserMessage, transactionSearch.AccountId])

  const selectBankAccount = (bankAccount) => {
    ClearSelectedTransactionsAndOperation();
    setTitle(bankAccount.Name);
    UpdateTransactionSearch("AccountId", bankAccount.AccountId);
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
