import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { reloadTransactionsState } from 'recoil/atoms/ReloadTransactionsState';
import { formatCurrency, isValidCurrency, stringToCurrency } from 'functions/CurrencyFunctions';
import SaveAndCancelButtons from './SaveAndCancelButtons';
import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsState';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userMessageState } from 'recoil/atoms/UserMessageState';
import { useState } from 'react'

function MoveWages({ handleClose }) {

    const [creditToMove, setCreditToMove] = useState(0);
    const setReloadTransactions = useSetRecoilState(reloadTransactionsState);
    const [selectedTransactions, setSelectedTransactions] = useRecoilState(selectedTransactionsState);
    const setUserMessage = useSetRecoilState(userMessageState);

    function Save() {

        axios.post(
            apiBaseUrl + "/transactions/moveWages",
            {
                TransactionIdFrom: selectedTransactions[0].TransactionId,
                TransactionIdTo: selectedTransactions[1].TransactionId,
                CreditToMove: creditToMove
            }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                setReloadTransactions(new Date());
                setUserMessage({
                    Message: `Credit ${formatCurrency(Math.abs(response.data.CreditToMove))} moved from ${response.data.transactionFrom.Category.Name} to ${response.data.transactionTo.Category.Name}.`,
                    Variant: "success"
                })
                setSelectedTransactions([response.data.transactionFrom, response.data.transactionTo]);
                setCreditToMove(0);
            })
            .catch(function (error) {
                setUserMessage({
                    Message: error.response.data.validationErrors[0],
                    Variant: "danger"
                })
            })
    }

    function validateAndSetCreditToMove(credit) {

        if (!isValidCurrency(credit)) {
            setUserMessage({ Message: `${credit} is not valid currency.`, Variant: "danger" });
            setCreditToMove(0);
            return;
        }

        if (credit === 0) {
            setUserMessage({ Message: `Enter a value greater than zero.`, Variant: "danger" });
            setCreditToMove(0);
            return;
        }

        if (credit > selectedTransactions[0].Credit) {
            setUserMessage({ Message: `Value cannot be greater than ${selectedTransactions[0].Credit}.`, Variant: "danger" });
            setCreditToMove(0);
            return;
        }

        if (credit < -selectedTransactions[1].Credit) {
            setUserMessage({ Message: `Value cannot be less than ${selectedTransactions[1].Credit}.`, Variant: "danger" });
            setCreditToMove(0);
            return;
        }

        setUserMessage(null);

        setCreditToMove(credit);
    }

    const transactionToMoveFrom = selectedTransactions[0];
    const transactionToMoveTo = selectedTransactions[1];

    return (
        <Container>

            <Row className="mb-3">

                <Form.Label>To move:</Form.Label>




                <Form.Control
                    defaultValue={creditToMove}
                    type="text"
                    size="sm"
                    style={{ backgroundColor: "white" }}
                    onChange={e => validateAndSetCreditToMove(e.target.value)}
                />


            </Row>

            <Row>
                <Col xs={6}>
                    <b>Category</b>
                </Col>

                <Col xs={2}>
                    <b>Credit</b>
                </Col>

                <Col xs={2}>
                    <b>New</b>
                </Col>
            </Row>

            <Row>
                <Col xs={6}>
                    {transactionToMoveFrom.Category?.Name}
                </Col>

                <Col xs={2}>
                    {transactionToMoveFrom.Credit}
                </Col>

                <Col xs={2}>
                    {transactionToMoveFrom.Credit - creditToMove}
                </Col>
            </Row>

            <Row>
                <Col xs={6}>
                    {transactionToMoveTo.Category?.Name}
                </Col>

                <Col xs={2}>
                    {transactionToMoveTo.Credit}
                </Col>

                <Col xs={2}>
                    {transactionToMoveTo.Credit + stringToCurrency(creditToMove)}
                </Col>
            </Row>

            <SaveAndCancelButtons save={() => Save()} handleClose={handleClose} saveButtonEnabled={true} />

        </Container>
    );
}

export default MoveWages;