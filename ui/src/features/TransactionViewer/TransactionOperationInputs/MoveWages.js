import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useSetError } from "hooks/useSetError";
import { useRecoilState, useRecoilValue } from "recoil";
import { useClearError } from "hooks/useClearError";

function MoveWages() {

    const operation = "Move wages";

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const showForm = transactionOperation === operation
    const hasValidTransactionSelected = selectedTransactions?.length === 2

    useClearError(showForm && hasValidTransactionSelected);
    useSetError(`You must select two transactions`, "warning", showForm && !hasValidTransactionSelected);

    if (!showForm || !hasValidTransactionSelected) {
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