import { addEditTransactionAtom } from 'common/recoil/atoms/AddEditTransactionAtom';
import { apiBaseUrl } from 'common/consts/ApiConsts';
import axios from 'axios'
import { categoriesAtom } from 'common/recoil/atoms/CategoriesAtom';
import { Col, Form, Row } from 'react-bootstrap';
import { selectedBankAccountAtom } from 'common/recoil/atoms/SelectedBankAccountAtom';
import { stringToCurrency } from 'common/functions/CurrencyFunctions';
import { useEffect } from 'react'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import SaveAndCancelButtons from './SaveAndCancelButtons';

function AddEdit({ handleClose }) {

    const setAddEditTransaction = useSetRecoilState(addEditTransactionAtom);
    const [categories, setCategories] = useRecoilState(categoriesAtom);
    const selectedBankAccount = useRecoilValue(selectedBankAccountAtom);

    useEffect(() => {
        axios.get(apiBaseUrl + '/categories/get')
            .then(function (response) {
                setCategories(response.data)
            })
    }, [setCategories])

    function Save() {

        let effDate = new Date(document.getElementById("addEdit_EffDate").value);
        let formattedEffDate = effDate.getFullYear() + '-' + (effDate.getMonth() + 1) + '-' + effDate.getDate();

        setAddEditTransaction({
            AccountId: selectedBankAccount.AccountId,
            CategoryId: document.getElementById("addEdit_CategoryId").value,
            Credit: stringToCurrency(document.getElementById("addEdit_Credit").value),
            Debit: stringToCurrency(document.getElementById("addEdit_Debit").value),
            Description: document.getElementById("addEdit_Description").value,
            EffDate: formattedEffDate,
            IsWage: document.getElementById("addEdit_IsWage").checked,
            Item: document.getElementById("addEdit_Item").value
        })
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
            <Row style={{ paddingTop: "20px" }}>

                <Col xs={3}>
                    <Form.Label>Date:</Form.Label>
                </Col>

                <Col xs={6}>
                    <Form.Control
                        id="addEdit_EffDate"
                        type="date"
                    />
                </Col>
            </Row>

            <Row style={{ paddingTop: "5px" }}>
                <Col xs={3}>
                    <Form.Label>Category:</Form.Label>
                </Col>

                <Col xs={9}>
                    <Form.Select
                        id="addEdit_CategoryId">
                        {
                            sortedCategories.map(category => (
                                <option value={category.Id}>{`${category.Group.Name} | ${category.Name}`}</option>
                            ))
                        }
                    </Form.Select>
                </Col>

            </Row>

            <Row style={{ paddingTop: "5px" }}>

                <Col xs={3}>
                    <Form.Label>Debit:</Form.Label>
                </Col>

                <Col xs={4}>
                    <Form.Control
                        id="addEdit_Debit"
                    />
                </Col>
            </Row>

            <Row style={{ paddingTop: "5px" }}>
                <Col xs={3}>
                    <Form.Label>Credit:</Form.Label>
                </Col>

                <Col xs={4}>
                    <Form.Control
                        id="addEdit_Credit"
                    />
                </Col>

            </Row>

            <Row style={{ paddingTop: "5px" }}>

                <Col xs={3}>
                    <Form.Label>Description:</Form.Label>
                </Col>

                <Col xs={9}>
                    <Form.Control
                        id="addEdit_Description"
                    />
                </Col>
            </Row>

            <Row style={{ paddingTop: "5px" }}>
                <Col xs={3}>
                    <Form.Label>Item:</Form.Label>
                </Col>

                <Col xs={9}>
                    <Form.Control
                        id="addEdit_Item"
                    />
                </Col>

            </Row>

            <Row style={{ paddingTop: "5px" }}>

                <Col xs={3}>
                    <Form.Label>Is wage?:</Form.Label>
                </Col>

                <Col xs={9}>
                    <Form.Check
                        id="addEdit_IsWage"
                        type="switch"
                    />
                </Col>

            </Row>

            <SaveAndCancelButtons save={() => Save()} handleClose={handleClose} saveButtonEnabled={true} />
        </>
    );
}

export default AddEdit;