import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { Col, Form, Row } from 'react-bootstrap';
import { doRefreshTransactionsAtom } from "recoil/atoms/DoRefreshTransactionsAtom";
import { formatCurrency, isValidCurrency, stringToCurrency } from 'functions/Currency';
import SaveAndCancelButtons from './Shared/SaveAndCancelButtons';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';

function MoveWages() {

    const operation = "Move wages";

    const [creditToMove, setCreditToMove] = useState(0);
    const setRefreshTransactions = useSetRecoilState(doRefreshTransactionsAtom);
    const [selectedTransactions, setSelectedTransactions] = useRecoilState(selectedTransactionsAtom);
    const transactionOperation = useRecoilValue(transactionOperationAtom);

    const showForm = transactionOperation === operation
    const hasValidTransactionsSelected = selectedTransactions
        && selectedTransactions.length === 2
        && selectedTransactions.filter(x => x.IsWage === true).length === 2
        && selectedTransactions[0].EffDate === selectedTransactions[1].EffDate

    const setUserMessage = useSetRecoilState(userMessageAtom);

    useEffect(() => {
        if (showForm) {
            if (!hasValidTransactionsSelected) {
                setUserMessage({ Message: `You must select two wage transactions and on the same date.`, Variant: "warning" });
            }
            else {
                setUserMessage(null);
            }
        }
    }, [showForm, hasValidTransactionsSelected, setUserMessage])

    if (!showForm || !hasValidTransactionsSelected) {
        return null;
    }

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
                setRefreshTransactions(prevValue => !prevValue);
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

            <SaveAndCancelButtons save={() => Save()} />

        </>
    );
}

export default MoveWages;