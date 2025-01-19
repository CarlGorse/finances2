import Dropdown from 'react-bootstrap/Dropdown';
import { padStart } from 'functions/NumberFunctions'
import { useEffect, useState } from 'react';

function NumberSelector({ defaultValue, onSelect, values, startPadding }) {

  const [text, setText] = useState("");

  const selectValue = (value) => {
    setText(value);
    onSelect(value);
  };

  useEffect(() => {
    setText(defaultValue);
  }, [defaultValue]);

  return (

    <Dropdown>

      <Dropdown.Toggle variant="light">
        {padStart(text, startPadding, '0')}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {values?.map(value =>
          <Dropdown.Item key={value}>
            <div onClick={(e) => {
              selectValue(e.target.textContent)
            }}>
              {padStart(value, startPadding, '0')}
            </div>

          </Dropdown.Item>
        )}
      </Dropdown.Menu>

    </Dropdown>

  );
}

export default NumberSelector;