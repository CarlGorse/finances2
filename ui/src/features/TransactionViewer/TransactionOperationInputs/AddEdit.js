import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { apiBaseUrl } from 'functions/Api'
import axios from 'axios'
import { categoriesAtom } from 'recoil/atoms/CategoriesAtom';
import { Col, Form, Row } from 'react-bootstrap';
import { stringToCurrency } from 'functions/Currency';
import { useEffect } from 'react'
import { useRecoilState } from "recoil";

function AddEdit(transactionOperation) {

    const [addEditTransaction, setAddEditTransaction] = useRecoilState(addEditTransactionAtom);
    const [categories, setCategories] = useRecoilState(categoriesAtom);

    async function updateAddEditTransaction(propertyName, value) {
        setAddEditTransaction(prevState => ({ ...prevState, [propertyName]: value }));
    }

    useEffect(() => {
        axios.get(apiBaseUrl + '/categories/get')
            .then(function (response) {
                setCategories(response.data)
            })
    }, [])

    useEffect(() => {
        setAddEditTransaction({
            TransactionId: null,
            EffDate: new Date(),
            AccountId: null,
            CategoryId: categories[0]?.CategoryId,
            Credit: null,
            Debit: null,
            IsWage: null,
            Exclude: null,
            Item: null,
            Description: null
        });
    }, [categories])

    if (addEditTransaction == null) {
        return null;
    }

    return (
        <>
            <Row>
                <Col xs={2}>
                    <Form.Label>EffDate</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control
                        type="date"
                        value={new Date(addEditTransaction.EffDate).toISOString().split('T')[0]}
                        onChange={e => { updateAddEditTransaction("EffDate", e.target.value); }}
                    />
                </Col>
                <Col xs={2}>
                    <Form.Label>Debit</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control
                        value={addEditTransaction.Debit}
                        onChange={e => updateAddEditTransaction("Debit", stringToCurrency(e.target.value))}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Form.Label>Description</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control
                        value={addEditTransaction.Description}
                        onChange={e => updateAddEditTransaction("Description", e.target.value)}
                    />
                </Col>
                <Col xs={2}>
                    <Form.Label>Credit</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control
                        value={addEditTransaction.Credit}
                        onChange={e => { updateAddEditTransaction("Credit", stringToCurrency(e.target.value)) }}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Form.Label>Category</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Select
                        value={addEditTransaction.CategoryId}
                        onChange={e => updateAddEditTransaction("CategoryId", e.target.value)}>
                        {
                            categories?.map(category => (
                                <option value={category.Id}>{category.Name}</option>
                            ))
                        }
                    </Form.Select>
                </Col>
                <Col xs={2}>
                    <Form.Label>Is wage?</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Check
                        value={addEditTransaction.IsWage}
                        onChange={e => { updateAddEditTransaction("IsWage", e.target.checked) }}
                    />
                </Col>
            </Row >
            <Row>
                <Col xs={2}>
                    <Form.Label>Item</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Control
                        value={addEditTransaction.Item}
                        onChange={e => updateAddEditTransaction("Item", e.target.value)}
                    />
                </Col>
                <Col xs={2}>
                    <Form.Label>Exclude?</Form.Label>
                </Col>
                <Col xs={3}>
                    <Form.Check
                        value={addEditTransaction.Exclude}
                        onChange={e => updateAddEditTransaction("Exclude", e.target.checked)}
                    />
                </Col>
            </Row>
        </>
    );
}

export default AddEdit;