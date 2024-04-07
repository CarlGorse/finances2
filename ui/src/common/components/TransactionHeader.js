import { Col, Form, Row } from 'react-bootstrap';
import { selectedTransactionsAtom } from 'common/recoil/atoms/SelectedTransactionsAtom';
import { useRecoilState } from 'recoil';

function TransactionHeader({ showClearOption }) {

  const [selectedTransactions, setSelectedTransactions] = useRecoilState(selectedTransactionsAtom);

  let firstColMarkup;
  firstColMarkup = showClearOption && <Form.Check checked={selectedTransactions?.length > 0} onClick={() => setSelectedTransactions(null)} />

  return (
    <Row>

      <Col xs={1} className="text-center">
        {firstColMarkup}
      </Col>

      <Col xs={2}>
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

      <Col xs={2} />

    </Row >
  )
}

export default TransactionHeader;