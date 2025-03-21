import { Col, Form, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loadedTransactionsState } from "recoil/atoms/LoadedTransactionsState";
import { transactionsPageDataState } from "recoil/atoms/TransactionsPageDataState";
import LoadedTransactions from "types/LoadedTransactions";
import TransactionsPageData from "types/TransactionsPageData";

function PageSizeSelector() {
  const pageData = useRecoilValue<TransactionsPageData>(
    transactionsPageDataState,
  );
  const loadedTransactions = useRecoilValue<LoadedTransactions>(
    loadedTransactionsState,
  );

  const setPageData = useSetRecoilState<TransactionsPageData>(
    transactionsPageDataState,
  );

  const pageSize = pageData.PageSize ?? loadedTransactions.TotalTransactions;

  return (
    <Row>
      <Col xs={3}>
        <Form.Label>Page size:</Form.Label>
      </Col>

      <Col xs={3}>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {pageSize}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {[10, 50, 100]
              .filter((x) => x < loadedTransactions.TotalTransactions)
              .map((pageSize) => (
                <Dropdown.Item key={pageSize.toString()} as="button">
                  <div
                    onClick={() => {
                      setPageData((prevState) => ({
                        ...prevState,
                        PageSize: pageSize,
                      }));
                    }}
                  >
                    {pageSize.toString()}
                  </div>
                </Dropdown.Item>
              ))}
            {
              <Dropdown.Item
                key={loadedTransactions.TotalTransactions}
                as="button"
              >
                <div
                  onClick={() => {
                    setPageData((prevState) => ({
                      ...prevState,
                      PageSize: loadedTransactions.TotalTransactions,
                    }));
                  }}
                >
                  {loadedTransactions.TotalTransactions} (all)
                </div>
              </Dropdown.Item>
            }
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
}

export default PageSizeSelector;
