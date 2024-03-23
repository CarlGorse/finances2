import { Col, Row } from 'react-bootstrap';
import DropdownFilter from './Components/DropdownFilter'
import { transactionSearchAtom } from 'recoil/atoms/TransactionSearchAtom';
import { useRecoilState } from "recoil";

function YearAndPeriodSelector() {

  const periods = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  const [transactionSearch, setTransactionSearch] = useRecoilState(transactionSearchAtom);
  const years = ["2023", "2024"]

  function UpdateTransactionSearch(propertyName, value) {
    setTransactionSearch(prevState => ({ ...prevState, [propertyName]: value }))
  }

  return (
    <>
      <Row>
        <Col xs={1}>From:</Col>
        <Col xs={1}>
          <DropdownFilter
            defaultValue={transactionSearch?.StartPeriod}
            onSelect={value => UpdateTransactionSearch("StartPeriod", value)}
            values={periods} />
        </Col>
        <Col>
          <DropdownFilter
            defaultValue={transactionSearch?.StartYear}
            onSelect={value => UpdateTransactionSearch("StartYear", value)}
            values={years} />
        </Col>
        <Col />
      </Row>
      <Row>
        <Col xs={1}>To:</Col>
        <Col xs={1}>
          <DropdownFilter
            defaultValue={transactionSearch?.EndPeriod}
            onSelect={value => UpdateTransactionSearch("EndPeriod", value)}
            values={periods} />
        </Col>
        <Col>
          <DropdownFilter
            defaultValue={transactionSearch?.EndYear}
            onSelect={value => UpdateTransactionSearch("EndYear", value)}
            values={years} />
        </Col>
        <Col />
      </Row>
    </>
  );
}

export default YearAndPeriodSelector;