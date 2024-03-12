import { Col, Row } from 'react-bootstrap';

function TransactionHeader() {

  return (
    <Row>
      <Col xs={1} />
      <Col xs={1}>
        <b>Date</b>
      </Col>
      <Col xs={2}>
        <b>Group</b>
      </Col>
      <Col xs={2}>
        <b>Category</b>
      </Col>
      <Col xs={2}>
        <b>Description</b>
      </Col>
      <Col xs={1}>
        <b>Credit</b>
      </Col>
      <Col xs={1}>
        <b>Debit</b>
      </Col>
      <Col xs={2}>
        <b>Balance</b>
      </Col>
    </Row>
  )
}

export default TransactionHeader;