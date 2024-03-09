import { Col, Row } from 'react-bootstrap';
import { formatDateTimeAsDateDDMMYYYY } from 'functions/transactions.js';
import { formatCurrency } from 'functions/currency.js';

function TransactionRow({ transactionTotal }) {
  return (
    <Row>
      <Col>
        {formatDateTimeAsDateDDMMYYYY(transactionTotal.Transaction.EffDate)}
      </Col>
      <Col>
        {transactionTotal.Transaction.Category.Group.Name}
      </Col>
      <Col>
        {transactionTotal.Transaction.Category.Name}
      </Col>
      <Col>
        {transactionTotal.Transaction.Description}
      </Col>
      <Col>
        {formatCurrency(transactionTotal.Transaction.Credit)}
      </Col>
      <Col>
        {formatCurrency(transactionTotal.Transaction.Debit)}
      </Col>
      <Col>
        {formatCurrency(transactionTotal.RunningTotal)}
      </Col>
    </Row>
  )
}

export default TransactionRow;