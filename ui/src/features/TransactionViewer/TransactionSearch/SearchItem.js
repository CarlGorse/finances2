import Dropdown from 'react-bootstrap/Dropdown';
import { Row, Col } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';

function SearchItem({ defaultValue, onSelect, values }) {

  const [title, setTitle] = useState("");

  const selectValue = useCallback((value) => {
    setTitle(value);
    onSelect(value);
  }, [onSelect]);

  useEffect(() => {
    setTitle(defaultValue)
    onSelect(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <Row>
        <Col>
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
        </Col>
      </Row>
    </>
  );
}

export default SearchItem;