import { Col, Form, Row } from 'react-bootstrap';

function AddEdit() {

    return (
        <Row style={{ paddingTop: "5px" }}>

            <Col xs={3}>
                <Form.Label>Item:</Form.Label>
            </Col>

            <Col xs={9}>
                <Form.Control
                    id="addEdit_Item"
                />
            </Col>

        </Row>
    );
}

export default AddEdit;