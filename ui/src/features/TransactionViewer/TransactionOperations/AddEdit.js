import { Col, Container, Form, Row } from 'react-bootstrap';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilValue } from "recoil";

function AddEdit({ operation }) {

    const transactionOperation = useRecoilValue(transactionOperationAtom);

    if (transactionOperation !== operation) {
        return null
    }

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