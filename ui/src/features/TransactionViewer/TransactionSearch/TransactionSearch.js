import { Container, Row, Col } from 'react-bootstrap';
import SearchItem from './SearchItem'
import { transactionSearchAtom } from 'recoil/atoms/TransactionSearchAtom';
import { useSetRecoilState } from "recoil";

function TransactionSearch() {

  const periods = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  const years = ["2023", "2024"]
  const setTransactionSearch = useSetRecoilState(transactionSearchAtom);

  function UpdateTransactionSearch(propertyName, value) {
    setTransactionSearch(prevState => ({ ...prevState, [propertyName]: value }))
  }

  return (
    <Container>
      <Row>
        <Col xs={1}>From:</Col>
        <Col xs={1}>
          <SearchItem defaultValue="01" onSelect={value => UpdateTransactionSearch("StartPeriod", value)} values={periods} />
        </Col>
        <Col>
          <SearchItem defaultValue="2024" onSelect={value => UpdateTransactionSearch("StartYear", value)} values={years} />
        </Col>
        <Col>

        </Col>
      </Row>
      <Row>
        <Col xs={1}>To:</Col>
        <Col xs={1}>
          <SearchItem defaultValue="03" onSelect={value => UpdateTransactionSearch("EndPeriod", value)} values={periods} />
        </Col>
        <Col>
          <SearchItem defaultValue="2024" onSelect={value => UpdateTransactionSearch("EndYear", value)} values={years} />
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  );
}

export default TransactionSearch;