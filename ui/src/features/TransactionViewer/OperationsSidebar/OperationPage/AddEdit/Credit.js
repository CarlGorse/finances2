import { Col, Form, Row } from 'react-bootstrap';

function AddEdit() {

    return (
        <Row style={{ paddingTop: "5px" }}>

            <Col xs={3}>
                <Form.Label>Credit:</Form.Label>
            </Col>

            <Col xs={4}>
                <Form.Control
                    id="addEdit_Credit"
                />
            </Col>

        </Row>
    );
}

export default AddEdit;