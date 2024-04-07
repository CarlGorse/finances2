import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios';
import { Col, Form, Row } from 'react-bootstrap';
import { lastTransactionsLoadDateAtom } from "recoil/atoms/LastTransactionsLoadDateAtom";
import { formatCurrency, isValidCurrency, stringToCurrency } from 'functions/CurrencyFunctions';
import SaveAndCancelButtons from './Shared/SaveAndCancelButtons';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { useRecoilState, useSetRecoilState } from "recoil";
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';
import { useState } from 'react'

function MoveWages({ handleClose }) {

    const [creditToMove, setCreditToMove] = useState(0);
    const [selectedTransactions, setSelectedTransactions] = useRecoilState(selectedTransactionsAtom);
    const setLastTransactionsLoadDate = useSetRecoilState(lastTransactionsLoadDateAtom);

    const setUserMessage = useSetRecoilState(userMessageAtom);

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
                setLastTransactionsLoadDate(new Date());
                setUserMessage({
                    Message: `Credit ${formatCurrency(Math.abs(response.data.CreditToMove))} moved from ${response.data.transactionFrom.Category.Name} to ${response.data.transactionTo.Category.Name}.`,
                    Variant: "success"
                })
                //CancelTransactionOperation()
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
        <>
            <Row>
                <Col xs={1} />
                <Col xs={1}>
                    <b>Date</b>
                </Col>
                <Col xs={2}>
                    <b>Group</b>
                </Col>
                <Col xs={2}>
                    <b>Category</b>
                </Col>
                <Col xs={2}>
                    <b>Description</b>
                </Col>
                <Col xs={1}>
                    <b>Credit</b>
                </Col>
                <Col xs={1}>
                    <b>To move</b>
                </Col>
                <Col xs={1}>
                    <b>New credit</b>
                </Col>
            </Row>

            <Row>
                <Col xs={1} />
                <Col xs={1}>
                    {new Date(transactionToMoveFrom.EffDate).toISOString().split('T')[0]}
                </Col>
                <Col xs={2}>
                    {transactionToMoveFrom.Category.Group?.Name}
                </Col>
                <Col xs={2}>
                    {transactionToMoveFrom.Category?.Name}
                </Col>
                <Col xs={2}>
                    {transactionToMoveFrom.Description}
                </Col>
                <Col xs={1}>
                    {transactionToMoveFrom.Credit}
                </Col>
                <Col xs={1}>
                    <Form.Control defaultValue={creditToMove} type="text" size="sm" style={{ backgroundColor: "white" }} onChange={e => validateAndSetCreditToMove(e.target.value)} />
                </Col>
                <Col xs={1}>
                    {transactionToMoveFrom.Credit - creditToMove}
                </Col>
            </Row>

            <Row>
                <Col xs={1} />
                <Col xs={1}>
                    {new Date(transactionToMoveTo.EffDate).toISOString().split('T')[0]}
                </Col>
                <Col xs={2}>
                    {transactionToMoveTo.Category.Group?.Name}
                </Col>
                <Col xs={2}>
                    {transactionToMoveTo.Category?.Name}
                </Col>
                <Col xs={2}>
                    {transactionToMoveTo.Description}
                </Col>
                <Col xs={1}>
                    {transactionToMoveTo.Credit}
                </Col>
                <Col xs={1}>
                </Col>
                <Col xs={1}>
                    {transactionToMoveTo.Credit + stringToCurrency(creditToMove)}
                </Col>
            </Row>

            <SaveAndCancelButtons save={() => Save()} handleClose={handleClose} saveButtonEnabled={true} />

        </>
    );
}

export default MoveWages;