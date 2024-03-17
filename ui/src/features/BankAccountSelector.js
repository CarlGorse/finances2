import Dropdown from 'react-bootstrap/Dropdown';
import { apiBaseUrl } from 'functions/Api';
import { clearSelectedTransactionsAtom } from 'recoil/atoms/ClearSelectedTransactionsAtom';
import { systemErrorAtom } from 'recoil/atoms/SystemErrorAtom';
import { transactionSearchAtom } from 'recoil/atoms/TransactionSearchAtom';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from "recoil";
import axios from 'axios';

function BankAccountSelector() {

  const [title, setTitle] = useState("");
  const [bankAccounts, setBankAccounts] = useState(null);

  const defaultAccountName = "Cash";
  const setClearSelectedTransactions = useSetRecoilState(clearSelectedTransactionsAtom);
  const setTransactionSearch = useSetRecoilState(transactionSearchAtom);
  const setSystemError = useSetRecoilState(systemErrorAtom);

  function UpdateTransactionSearch(propertyName, value) {
    setTransactionSearch(prevState => ({ ...prevState, [propertyName]: value }))
  }

  const selectBankAccount = useCallback((bankAccount) => {
    ClearSelectedTransactions();
    setTitle(bankAccount.Name);
    UpdateTransactionSearch("AccountId", bankAccount.Id);
  }, []);

  async function ClearSelectedTransactions() {
    await setClearSelectedTransactions(true);
    setClearSelectedTransactions(false);
  }

  useEffect(() => {
    axios.get(apiBaseUrl + "/bankAccounts/get")
      .then(response => {
        setBankAccounts(response.data.Accounts);
        selectBankAccount(response.data.Accounts.find(bankAccount => bankAccount.Name === defaultAccountName));
        setSystemError({ Error: null, Variant: null });
      })
      .catch(
        setSystemError({ Message: "Unable to load bank accounts", Variant: "danger" })
      )
  }, [selectBankAccount, setSystemError])

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
