import { Col, Form, Row } from 'react-bootstrap';

export default function DeductWage({ show }) {

    if (!show) {
        return;
    }

    return (
        <Row style={{ paddingTop: "5px" }}>

            <Col xs={3}>
                <Form.Label>Wage to deduct from:</Form.Label>
            </Col>

            <Col xs={9}>
                <Form.Check
                    id="addEdit_IsWage"
                    type="switch"

                />
            </Col>

        </Row>
    );
}