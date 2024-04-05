import { Col, Row } from 'react-bootstrap';

function TransactionHeader() {

  return (
    <Row>
      <Col xs={1}>
        <b>(select)</b>
      </Col>
      <Col xs={1}>
        <b>Date</b>
      </Col>
      <Col xs={4}>
        <b>Group | Category</b>
      </Col>
      <Col xs={1}>
        <b>Credit</b>
      </Col>
      <Col xs={1}>
        <b>Debit</b>
      </Col>
      <Col xs={1}>
        <b>Balance</b>
      </Col>
      <Col xs={2}>
      </Col>
    </Row>
  )
}

export default TransactionHeader;