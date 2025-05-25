import { Col, Form, Row } from 'react-bootstrap';

export default function Credit({ defaultValue }) {

    return (
        <Row style={{ paddingTop: "5px" }}>

            <Col xs={3}>
                <Form.Label>Credit:</Form.Label>
            </Col>

            <Col xs={4}>
                <Form.Control
                    id="addEdit_Credit"
                    defaultValue={defaultValue}
                />
            </Col>

        </Row>
    );
}