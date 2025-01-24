import { Col, Form, Row } from 'react-bootstrap';

function AddEdit() {

    return (
        <Row style={{ paddingTop: "5px" }}>

            <Col xs={3}>
                <Form.Label>Is wage?:</Form.Label>
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

export default AddEdit;