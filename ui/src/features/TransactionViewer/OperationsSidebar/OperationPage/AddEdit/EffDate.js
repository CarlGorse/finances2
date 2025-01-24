import { Col, Form, Row } from 'react-bootstrap';
import { getDateAsYYYYMMDD } from 'functions/DateFunctions'

function AddEdit({ defaultValue }) {

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

export default AddEdit;