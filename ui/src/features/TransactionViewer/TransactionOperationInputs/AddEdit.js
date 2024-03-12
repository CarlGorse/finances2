import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { Col, Form, Row } from 'react-bootstrap';
import { useSetRecoilState } from "recoil";

function AddEdit() {

    const setAddEditTransaction = useSetRecoilState(addEditTransactionAtom);

    async function updateAddEditTransaction(propertyName, value) {
        await setAddEditTransaction(prevState => ({ ...prevState, [propertyName]: value }));
    }

    return (
        <>
            <Row>
                <Col xs={2}>
                    <Form.Label>EffDate</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control onChange={e => updateAddEditTransaction("EffDate", e.target.value)} />
                </Col>
                <Col xs={2}>
                    <Form.Label>Debit</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control onChange={e => updateAddEditTransaction("Debit", e.target.value)} />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Form.Label>Description</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control onChange={e => updateAddEditTransaction("Description", e.target.value)} />
                </Col>
                <Col xs={2}>
                    <Form.Label>Credit</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control onChange={e => updateAddEditTransaction("Credit", e.target.value)} />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Form.Label>Category</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control onChange={e => updateAddEditTransaction("CategoryId", e.target.value)} />
                </Col>
                <Col xs={2}>
                    <Form.Label>Is wage?</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Check onChange={e => updateAddEditTransaction("IsWage", e.target.value)} />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Form.Label>Item</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control onChange={e => updateAddEditTransaction("Item", e.target.value)} />
                </Col>
                <Col xs={2}>
                    <Form.Label>Exclude?</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Check onChange={e => updateAddEditTransaction("Exclude", e.target.value)} />
                </Col>
            </Row>
        </>
    );
}

export default AddEdit;