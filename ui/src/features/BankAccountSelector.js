import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState, useCallback } from 'react';
import { baseUrl as apiBaseUrl, get as apiGet } from 'functions/api.js';
import { bankAccountAtom } from "recoil/atoms/BankAccountAtom";
import { useSetRecoilState } from "recoil";

function BankAccountSelector() {

  const [title, setTitle] = useState("");
  const [bankAccounts, setBankAccounts] = useState(null);
  const setBankAccount = useSetRecoilState(bankAccountAtom);

  const defaultAccountName = "Natwest";

  const selectBankAccount = useCallback((bankAccount) => {
    setTitle(bankAccount.Name);
    setBankAccount(bankAccount);
  }, [setBankAccount]);

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
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {bankAccounts?.map(bankAccount => (

          <Dropdown.Item key={bankAccount.AccountId} as="button"><div onClick={(e) => {

            let bankAccount = bankAccounts.find(bankAccount => bankAccount.Name === e.target.textContent)

            selectBankAccount(bankAccount);

          }}>{bankAccount.Name}</div></Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BankAccountSelector;
