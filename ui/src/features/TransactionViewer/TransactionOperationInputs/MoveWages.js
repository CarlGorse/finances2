import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { formatDateTimeAsDateDDMMYYYY } from 'functions/DateTime'
import { isValidCurrency } from 'functions/Currency';
import { refreshTransactionsAtom } from "recoil/atoms/RefreshTransactionsAtom";
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';

function MoveWages() {

    const operation = "Move wages";

    const [creditToMove, setCreditToMove] = useState(0);
    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const setRefreshTransactions = useSetRecoilState(refreshTransactionsAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

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

    function MoveWages() {
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
                console.log(response)
                setRefreshTransactions(true); // to await this we'd have to know when the load finished
                setUserMessage({
                    Message: `Credit ${response.data.creditToMove} moved.`,
                    Variant: "success"
                })
                CancelTransactionOperation()
            })
            .catch(function (error) {
                setUserMessage({
                    Message: error.response.data.validationErrors[0],
                    Variant: "danger"
                })
            })
    }

    function CancelTransactionOperation() {
        setTransactionOperation(null)
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

    return (
        <>
            <Table>
                <Row>
                    <Col xs={2}>
                        <Form.Label>Credit to move:</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <Form.Control defaultValue={creditToMove} type="text" size="sm" style={{ backgroundColor: "white" }} onChange={e => validateAndSetCreditToMove(e.target.value)} />
                    </Col>
                </Row>
            </Table>

            <Table>
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
                    <Col xs={2}>
                        <b>New credit</b>
                    </Col>
                    <Col xs={1}>
                    </Col>
                </Row>
            </Table >

            <Table>
                {selectedTransactions.map((x, index) =>
                    <Row>
                        <Col xs={1} />
                        <Col xs={1}>
                            {new Date(x.EffDate).toISOString().split('T')[0]}
                        </Col>
                        <Col xs={2}>
                            {x.Category.Group?.Name}
                        </Col>
                        <Col xs={2}>
                            {x.Category?.Name}
                        </Col>
                        <Col xs={2}>
                            {x.Description}
                        </Col>
                        <Col xs={1}>
                            {x.Credit}
                        </Col>
                        <Col xs={2}>
                            {x.Credit - (index === 0 ? creditToMove : -creditToMove)}
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                )}
            </Table>
            <div style={{ marginTop: "20px" }}>
                <Button size="sm" onClick={() => MoveWages()}>Move</Button>
                <Button style={{ marginLeft: "1px" }} size="sm" onClick={() => CancelTransactionOperation()}>Cancel</Button>
            </div>
        </>
    );
}

export default MoveWages;