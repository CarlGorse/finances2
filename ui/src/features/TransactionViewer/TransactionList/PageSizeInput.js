import { Col, Form, Row } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { transactionsPageSizeAtom } from 'common/recoil/atoms/TransactionsPageSizeAtom';

function PageSizeInput() {

    const [transactionsPageSize, setTransactionsPageSize] = useRecoilState(transactionsPageSizeAtom);

    return <Row>
        <Col xs={1}>
            <Form.Label>Page size:</Form.Label>
        </Col>
        <Col xs={1}>
            <Form.Control
                value={transactionsPageSize}
                onChange={e => setTransactionsPageSize(e.target.value)}
            />
        </Col>
    </Row >
}

export default PageSizeInput;