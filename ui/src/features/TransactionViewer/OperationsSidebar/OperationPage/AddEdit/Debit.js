import { Col, Form, Row } from 'react-bootstrap';

export default function Debit({ defaultValue }) {

    return (
        <Row style={{ paddingTop: "5px" }}>

            <Col xs={3}>
                <Form.Label>Debit:</Form.Label>
            </Col>

            <Col xs={4}>
                <Form.Control
                    id="addEdit_Debit"
                    defaultValue={defaultValue}
                />
            </Col>
        </Row>
    );
}