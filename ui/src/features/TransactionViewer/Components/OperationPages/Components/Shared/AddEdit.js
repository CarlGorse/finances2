import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios'
import { categoriesAtom } from 'recoil/atoms/CategoriesAtom';
import { Col, Form, Row } from 'react-bootstrap';
import { stringToCurrency } from 'functions/CurrencyFunctions';
import { useEffect } from 'react'
import { useRecoilState } from "recoil";

function AddEdit({ onUpdate }) {

    const [addEditTransaction, setAddEditTransaction] = useRecoilState(addEditTransactionAtom);
    const [categories, setCategories] = useRecoilState(categoriesAtom);

    async function updateTransaction(propertyName, value) {
        setAddEditTransaction(prevState => ({ ...prevState, [propertyName]: value }));
        onUpdate();
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

    const categoriesForSort = [...categories]
    const sortedCategories = categoriesForSort?.sort(function (a, b) {
        if ((a.Group.Name < b.Group.Name)) {
            return -1;
        }
        else if (a.Group.Name === b.Group.Name) {
            if (a.Name < b.Name) {
                return -1;
            }
            else if (a.Name > b.Name) {
                return 1;
            }
            else {
                return 0;
            }
        }
        else {
            return 1;
        }
    });

    return (
        <>
            <Row>

                <Col xs={2}>
                    <Form.Label>Date:</Form.Label>
                </Col>

                <Col xs={3}>
                    <Form.Control
                        type="date"
                        value={addEditTransaction.EffDate}
                        onChange={e => { updateTransaction("EffDate", e.target.value); }}
                    />
                </Col>

                <Col xs={2}>
                    <Form.Label>Category:</Form.Label>
                </Col>

                <Col xs={3}>
                    <Form.Select
                        value={addEditTransaction.CategoryId}
                        onChange={e => updateTransaction("CategoryId", e.target.value)}>
                        {
                            sortedCategories.map(category => (
                                <option value={category.Id}>{`${category.Group.Name} | ${category.Name}`}</option>
                            ))
                        }
                    </Form.Select>
                </Col>

            </Row>

            <Row style={{ paddingTop: "5px" }}>

                <Col xs={2}>
                    <Form.Label>Debit:</Form.Label>
                </Col>

                <Col xs={3}>
                    <Form.Control
                        value={addEditTransaction.Debit}
                        onChange={e => updateTransaction("Debit", e.target.value)}
                        onBlur={e => updateTransaction("Debit", stringToCurrency(e.target.value))}
                    />
                </Col>

                <Col xs={2}>
                    <Form.Label>Credit:</Form.Label>
                </Col>

                <Col xs={3}>
                    <Form.Control
                        value={addEditTransaction.Credit}
                        onChange={e => updateTransaction("Credit", e.target.value)}
                        onBlur={e => updateTransaction("Credit", stringToCurrency(e.target.value))}
                    />
                </Col>

            </Row>

            <Row style={{ paddingTop: "5px" }}>

                <Col xs={2}>
                    <Form.Label>Description:</Form.Label>
                </Col>

                <Col xs={3}>
                    <Form.Control
                        value={addEditTransaction.Description}
                        onChange={e => updateTransaction("Description", e.target.value)}
                    />
                </Col>

                <Col xs={2}>
                    <Form.Label>Item:</Form.Label>
                </Col>

                <Col xs={3}>
                    <Form.Control
                        value={addEditTransaction.Item}
                        onChange={e => updateTransaction("Item", e.target.value)}
                    />
                </Col>

            </Row>

            <Row style={{ paddingTop: "5px" }}>

                <Col xs={2}>
                    <Form.Label>Is wage?:</Form.Label>
                </Col>

                <Col xs={3}>
                    <Form.Check
                        type="switch"
                        value={addEditTransaction.IsWage}
                        onChange={e => { updateTransaction("IsWage", e.target.checked) }}
                    />
                </Col>

            </Row>
        </>
    );
}

export default AddEdit;