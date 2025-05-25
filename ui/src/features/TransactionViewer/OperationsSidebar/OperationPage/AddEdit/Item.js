import { Col, Form, Row } from 'react-bootstrap';

export default function Item({ defaultValue }) {

    return (
        <Row style={{ paddingTop: "5px" }}>

            <Col xs={3}>
                <Form.Label>Item:</Form.Label>
            </Col>

            <Col xs={9}>
                <Form.Control
                    id="addEdit_Item"
                    defaultValue={defaultValue}
                />
            </Col>

        </Row>
    );
}