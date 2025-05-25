import { getDateAsYYYYMMDD } from 'functions/DateFunctions';
import { Col, Form, Row } from 'react-bootstrap';

export default function EffDate({ defaultValue }) {

    return (
        <Row style={{ paddingTop: "20px" }}>

            <Col xs={3}>
                <Form.Label>Date:</Form.Label>
            </Col>

            <Col xs={6}>
                <Form.Control
                    id="addEdit_EffDate"
                    type="date"
                    defaultValue={getDateAsYYYYMMDD(defaultValue)}
                />
            </Col>
        </Row>
    );
}