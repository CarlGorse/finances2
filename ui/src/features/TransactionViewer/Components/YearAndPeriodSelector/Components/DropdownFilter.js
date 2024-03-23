import Dropdown from 'react-bootstrap/Dropdown';
import { useCallback, useEffect, useState } from 'react';

function DropdownFilter({ defaultValue, onSelect, values }) {

  const [title, setTitle] = useState("");

  const selectValue = (value) => {
    setTitle(value);
    onSelect(value);
  };

  useEffect(() => {
    setTitle(defaultValue);
  }, [defaultValue]);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="light">
        {String(title).padStart(2, '0')}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {values.map(value =>
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

export default DropdownFilter;