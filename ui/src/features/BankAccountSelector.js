import Dropdown from 'react-bootstrap/Dropdown';
import { baseUrl as apiBaseUrl, get as apiGet } from 'functions/api.js';
import { transactionSearchAtom } from 'recoil/atoms/TransactionSearchAtom';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from "recoil";

function BankAccountSelector() {

  const [title, setTitle] = useState("");
  const [bankAccounts, setBankAccounts] = useState(null);

  const defaultAccountName = "Natwest";
  const setTransactionSearch = useSetRecoilState(transactionSearchAtom);

  function UpdateTransactionSearch(propertyName, value) {
    setTransactionSearch(prevState => ({ ...prevState, [propertyName]: value }))
  }

  const selectBankAccount = useCallback((bankAccount) => {
    setTitle(bankAccount.Name);
    UpdateTransactionSearch("AccountId", bankAccount.Id);
  }, []);

  useEffect(() => {
    apiGet(
      {
        url: apiBaseUrl + "/bankAccounts/get",
        callback: (response => {
          setBankAccounts(response.data.Accounts);
          selectBankAccount(response.data.Accounts.find(bankAccount => bankAccount.Name === defaultAccountName));
        })
      }
    )
  }, [selectBankAccount])

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
