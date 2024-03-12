import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { transactionOperationErrorAtom } from 'recoil/atoms/TransactionOperationErrorAtom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function MoveWages() {

    const operation = "Move wages";

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const setError = useSetRecoilState(transactionOperationErrorAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const isValidForm = transactionOperation === operation
    const hasValidTransactionSelected = selectedTransactions?.length === 2

    useEffect(() => {
        if (isValidForm) {
            if (!hasValidTransactionSelected) {
                setError({
                    Message: `You must select two transactions`,
                    Variant: "warning"
                })
            }
            else {
                setError({
                    Message: "",
                    Variant: ""
                })
            }
        }
    }, [transactionOperation, selectedTransactions]);

    if (!isValidForm || !hasValidTransactionSelected) {
        return null;
    }

    function MoveWages() {
        CancelTransactionOperation()
    }

    function CancelTransactionOperation() {
        setTransactionOperation(null)
    }

    return (
        <>
            <Table>
                <Row>
                    <Col xs={2}>
                        <Form.Label>Credit to move:</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <Form.Control type="text" size="sm" style={{ backgroundColor: "white" }} />
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
                    <Col xs={2}>
                        <b>New credit</b>
                    </Col>
                    <Col xs={2}>

                    </Col>
                </Row>
            </Table >

            <Table>
                <Row>
                    <Col xs={1} />
                    <Col xs={1}>
                    </Col>
                    <Col xs={2}>
                    </Col>
                    <Col xs={2}>
                    </Col>
                    <Col xs={2}>
                    </Col>
                    <Col xs={1}>
                    </Col>
                    <Col xs={1}>
                    </Col>
                    <Col xs={2}>
                    </Col>
                </Row>
            </Table>
            <div style={{ marginTop: "20px" }}>
                <Button size="sm" onClick={() => MoveWages()}>Move</Button>
                <Button style={{ marginLeft: "1px" }} size="sm" onClick={() => CancelTransactionOperation()}>Cancel</Button>
            </div>
        </>
    );
}

export default MoveWages;