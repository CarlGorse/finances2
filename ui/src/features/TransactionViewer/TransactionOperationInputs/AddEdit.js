import { Col, Container, Form, Row } from 'react-bootstrap';

function AddEdit({ operation }) {
    return (
        <>
            <Row>
                <Col xs={2}>
                    EffDate
                </Col>
                <Col xs={3}>
                    <Form.Control />
                </Col>
                <Col xs={2}>
                    Debit
                </Col>
                <Col xs={3}>
                    <Form.Control />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    Description
                </Col>
                <Col xs={3}>
                    <Form.Control />
                </Col>
                <Col xs={2}>
                    Credit
                </Col>
                <Col xs={3}>
                    <Form.Control />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    Category
                </Col>
                <Col xs={3}>
                    <Form.Control />
                </Col>
                <Col xs={2}>
                    Is wage?
                </Col>
                <Col xs={3}>
                    <Form.Check />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    Item
                </Col>
                <Col xs={3}>
                    <Form.Control />
                </Col>
                <Col xs={2}>
                    Exclude?
                </Col>
                <Col xs={3}>
                    <Form.Check />
                </Col>
            </Row>
        </>
    );
}

export default AddEdit;