import { Col, Container, Form, Row } from 'react-bootstrap';

function AddEdit({ operation }) {
    return (
        <>
            <Row>
                <Col xs={1}>
                    EffDate
                </Col>
                <Col xs={2}>
                    <Form.Control />
                </Col>
                <Col xs={1}>
                    Debit
                </Col>
                <Col xs={2}>
                    <Form.Control />
                </Col>
            </Row>
            <Row>
                <Col xs={1}>
                    Description
                </Col>
                <Col xs={2}>
                    <Form.Control />
                </Col>
                <Col xs={1}>
                    Credit
                </Col>
                <Col xs={2}>
                    <Form.Control />
                </Col>
            </Row>
            <Row>
                <Col xs={1}>
                    Category
                </Col>
                <Col xs={2}>
                    <Form.Control />
                </Col>
                <Col xs={1}>
                    Is wage?
                </Col>
                <Col xs={2}>
                    <Form.Check />
                </Col>
            </Row>
            <Row>
                <Col xs={1}>
                    Item
                </Col>
                <Col xs={2}>
                    <Form.Control />
                </Col>
                <Col xs={1}>
                    Exclude?
                </Col>
                <Col xs={2}>
                    <Form.Check />
                </Col>
            </Row>
        </>
    );
}

export default AddEdit;