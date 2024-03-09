import { Col, Row } from 'react-bootstrap';

function TransactionHeader() {

  return (
    <b>
      <Row>
        <Col>
          Date
        </Col>
        <Col>
          Group
        </Col>
        <Col>
          Category
        </Col>
        <Col>
          Description
        </Col>
        <Col>
          Credit
        </Col>
        <Col>
          Debit
        </Col>
        <Col>
          Balance
        </Col>
      </Row>
    </b>
  )
}

export default TransactionHeader;