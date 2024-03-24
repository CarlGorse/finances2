import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { apiBaseUrl } from 'functions/Api'
import axios from 'axios'
import { categoriesAtom } from 'recoil/atoms/CategoriesAtom';
import { Col, Form, Row } from 'react-bootstrap';
import { stringToCurrency } from 'functions/Currency';
import { useEffect } from 'react'
import { useRecoilState } from "recoil";

function AddEdit() {

    const [addEditTransaction, setAddEditTransaction] = useRecoilState(addEditTransactionAtom);
    const [categories, setCategories] = useRecoilState(categoriesAtom);

    async function updateTransactionPropertyValue(propertyName, value) {
        setAddEditTransaction(prevState => ({ ...prevState, [propertyName]: value }));
    }

    useEffect(() => {
        axios.get(apiBaseUrl + '/categories/get')
            .then(function (response) {
                setCategories(response.data)
            })
    }, [setCategories])

    if (addEditTransaction == null) {
        return null;
    }

    return (
        <>
            <Row>
                <Col xs={2}>
                    <Form.Label>Date:</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control
                        type="date"
                        defaultValue={new Date(addEditTransaction.EffDate).toISOString().split('T')[0]}
                        onBlur={e => { updateTransactionPropertyValue("EffDate", e.target.value); }}
                    />
                </Col>
                <Col xs={2}>
                    <Form.Label>Debit:</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control
                        defaultValue={addEditTransaction.Debit}
                        onBlur={e => updateTransactionPropertyValue("Debit", stringToCurrency(e.target.value))}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Form.Label>Description:</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control
                        defaultValue={addEditTransaction.Description}
                        onBlur={e => updateTransactionPropertyValue("Description", e.target.value)}
                    />
                </Col>
                <Col xs={2}>
                    <Form.Label>Credit:</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control
                        defaultValue={addEditTransaction.Credit}
                        onBlur={e => { updateTransactionPropertyValue("Credit", stringToCurrency(e.target.value)) }}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Form.Label>Category:</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Select
                        defaultValue={addEditTransaction.CategoryId}
                        onBlur={e => updateTransactionPropertyValue("CategoryId", e.target.value)}>
                        {
                            categories?.map(category => (
                                <option value={category.Id}>{`${category.Group.Name} | ${category.Name}`}</option>
                            ))
                        }
                    </Form.Select>
                </Col>
                <Col xs={2}>
                    <Form.Label>Is wage?:</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Check
                        type="switch"
                        defaultValue={addEditTransaction.IsWage}
                        onBlur={e => { updateTransactionPropertyValue("IsWage", e.target.checked) }}
                    />
                </Col>
            </Row >
            <Row>
                <Col xs={2}>
                    <Form.Label>Item:</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control
                        defaultValue={addEditTransaction.Item}
                        onBlur={e => updateTransactionPropertyValue("Item", e.target.value)}
                    />
                </Col>
                <Col xs={2}>
                    <Form.Label>Exclude?:</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Check
                        type="switch"
                        defaultValue={addEditTransaction.Exclude}
                        onBlur={e => updateTransactionPropertyValue("Exclude", e.target.checked)}
                    />
                </Col>
            </Row>
        </>
    );
}

export default AddEdit;