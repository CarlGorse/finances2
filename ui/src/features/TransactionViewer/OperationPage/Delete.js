import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { reloadTransactionsState } from 'recoil/atoms/ReloadTransactionsAtom';
import SaveAndCancelButtons from './SaveAndCancelButtons';
import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsAtom';
import { Table } from 'react-bootstrap';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationAtom';
import { userMessageState } from 'recoil/atoms/UserMessageAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';

function Delete({ handleClose }) {

    const [selectedTransactions, setSelectedTransactions] = useRecoilState(selectedTransactionsState);
    const setReloadTransactions = useSetRecoilState(reloadTransactionsState);
    const setTransactionOperation = useSetRecoilState(transactionOperationState);
    const setUserMessage = useSetRecoilState(userMessageState);

    function Delete() {

        axios.post(
            apiBaseUrl + "/transactions/delete",
            selectedTransactions.map(x => x.TransactionId),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then(function () {
                setSelectedTransactions(null);
                setReloadTransactions(new Date());

                setUserMessage({
                    Message: `Transaction${selectedTransactions.length === 1 ? '' : 's'} deleted.`,
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

    return (
        <>
            <span>
                {`Do you wish to delete ${selectedTransactions.length === 1 ? 'this transaction' : `these transactions`}?`}
            </span>

            <div style={{ paddingTop: "10px" }} />

            <Table className="table-bordered">

                <div style={{ paddingTop: "10px" }}>
                    <Row>
                        <Col xs={4}>
                            <b>Date</b>
                        </Col>
                        <Col xs={4}>
                            <b>Value</b>
                        </Col>
                    </Row>
                </div>

                {selectedTransactions.map((transaction, index) => (
                    <Row>
                        <Col className="tableCell" xs={4}>
                            {transaction.EffDate}
                        </Col>
                        <Col className="tableCell" xs={4}>
                            {transaction.Credit > 0 ? transaction.Credit : transaction.Debit}
                        </Col>
                    </Row>
                ))}
            </Table>

            <SaveAndCancelButtons
                save={() => Delete()}
                saveButtonText="Yes"
                cancelButtonText="Cancel"
                handleClose={handleClose}
                saveButtonEnabled={selectedTransactions.length > 0}
            />

        </>
    );
}

export default Delete;