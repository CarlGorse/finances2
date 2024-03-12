import { Col, Form, Row } from 'react-bootstrap';

function AddEdit({ operation }) {
    return (
        <>
            <Row>
                <Col xs={2}>
                    <Form.Label>EffDate</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control />
                </Col>
                <Col xs={2}>
                    <Form.Label>Debit</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Form.Label>Description</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control />
                </Col>
                <Col xs={2}>
                    <Form.Label>Credit</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Form.Label>Category</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control />
                </Col>
                <Col xs={2}>
                    <Form.Label>Is wage?</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Check />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Form.Label>Item</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control />
                </Col>
                <Col xs={2}>
                    <Form.Label>Exclude?</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Check />
                </Col>
            </Row>
        </>
    );
}

export default AddEdit;