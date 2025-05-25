import { Col, Form, Row } from 'react-bootstrap';

export default function Description({ defaultValue }) {

    return (
        <Row style={{ paddingTop: "5px" }}>

            <Col xs={3}>
                <Form.Label>Description:</Form.Label>
            </Col>

            <Col xs={9}>
                <Form.Control
                    id="addEdit_Description"
                    defaultValue={defaultValue}
                />
            </Col>
        </Row>
    );
}