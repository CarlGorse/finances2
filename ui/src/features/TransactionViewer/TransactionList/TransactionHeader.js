import { Col, Form, Row } from 'react-bootstrap';
import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsAtom';
import { useRecoilValue } from 'recoil';
import useClearSelectedTransactions from 'hooks/useClearSelectedTransactions';

export default function TransactionHeader() {

  const selectedTransactions = useRecoilValue(selectedTransactionsState);
  const clearSelectedTransactions = useClearSelectedTransactions();

  return (
    <Row>

      <Col xs={1} className="text-center">
        <Form.Check
          disabled={!(selectedTransactions?.length > 0)}
          checked={selectedTransactions?.length > 0}
          onClick={clearSelectedTransactions}
        />
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