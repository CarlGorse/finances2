import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from 'react';
import { baseUrl as apiBaseUrl, get as apiGet } from 'functions/api.js';

function BankAccountSelector({ onSelect }) {

  const [getTitle, setTitle] = useState("");
  const [getBankAccounts, setBankAccounts] = useState(null);

  useEffect(() => {
    setTitle("Natwest")
  }, [])

  useEffect(() => {
    apiGet(
      {
        url: apiBaseUrl + "/bankAccounts/Get",
        callback: (response => {
          setBankAccounts(response.data);
        })
      }
    )
  }, [])

  if (getBankAccounts === null) {
    return;
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {getTitle}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {getBankAccounts.Accounts?.map((bankAccount) => (

          <Dropdown.Item key={bankAccount.AccountId} as="button"><div onClick={(e) => {
            setTitle(e.target.textContent);
            onSelect(e.target.textContent)
          }}>{bankAccount.Name}</div></Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BankAccountSelector;
