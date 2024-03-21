import Dropdown from 'react-bootstrap/Dropdown';
import { useCallback, useEffect, useState } from 'react';

function DropdownFilter({ defaultValue, onSelect, values }) {

  const [title, setTitle] = useState("");

  const selectValue = useCallback((value) => {
    setTitle(value);
    onSelect(value);
  }, [onSelect]);

  useEffect(() => {
    setTitle(defaultValue)
    onSelect(defaultValue);
  }, [defaultValue, onSelect]);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="light">
        {title}
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