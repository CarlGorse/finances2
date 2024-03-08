import { Col, Container, Row } from 'react-bootstrap';

function TransactionsList({ bankAccountName }) {

  return (
    <Container className='mt-5'>
      <p>Transactions for {bankAccountName}</p>
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
    </Container>
  )
}

export default TransactionsList;
