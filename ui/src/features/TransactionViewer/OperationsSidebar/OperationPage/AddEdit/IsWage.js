import { Col, Form, Row } from 'react-bootstrap';

export default function IsWage({ defaultValue }) {

    return (
        <Row style={{ paddingTop: "5px" }}>

            <Col xs={3}>
                <Form.Label>Is wage?:</Form.Label>
            </Col>

            <Col xs={9}>
                <Form.Check
                    id="addEdit_IsWage"
                    type="switch"
                    defaultChecked={defaultValue}
                />
            </Col>

        </Row>
    );
}