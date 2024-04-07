import Dropdown from 'react-bootstrap/Dropdown';
import { padStart } from 'common/functions/NumberFunctions'
import { useEffect, useState } from 'react';

function YearAndPeriodSelect({ defaultValue, onSelect, values }) {

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
        {padStart(text, 2, '0')}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {values?.map(value =>
          <Dropdown.Item key={value}>
            <div onClick={(e) => {
              selectValue(e.target.textContent)
            }}>
              {value}
            </div>

          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default YearAndPeriodSelect;